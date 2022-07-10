import { ClientSession } from 'mongodb';
import mongoose from 'mongoose';
import redis from 'redis';
import util from 'util';

const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({
	url: redisURL,
});

(client.get as any) = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

declare module 'mongoose' {
	interface SessionOperation {
		cache: () => this;
	}

	//@ts-ignore
	class Query {
		cache: () => this;
	}
}
//@ts-ignore
mongoose.Query.prototype.cache = function () {
	//@ts-ignore
	this.useCache = true;
	return this;
};

(mongoose.Query.prototype as any).exec = async function () {
	if (!this.useCache) {
		return exec.apply(this, arguments[0]);
	}

	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name,
		})
	);

	// See if we have a stringified version of the query in redis
	const cachedValue = await client.get(key);

	// If so, we can just return that instead of hitting the database
	if (cachedValue) {
		const doc = JSON.parse(cachedValue);

		//Hydrating arrays
		return Array.isArray(doc)
			? doc.map(d => new this.model(d))
			: new this.model(doc);
	}

	// Otherwise, issue the query ad store the result in redis
	const result = await exec.apply(this, arguments[0]);

	client.set(key, JSON.stringify(result), { EX: 10 });

	return result;
};

const clearHash = function (key: any) {
	client.del(JSON.stringify(key));
};

export { clearHash };
