import mongoose from 'mongoose';
import redis from 'redis';
import util from 'util';

const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({
	url: redisURL,
});

(client.get as any) = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

(mongoose.Query.prototype as any).cache = function () {
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

	//@ts-ignore
	client.set(key, JSON.stringify(result), 'EX', 10);

	return result;
};

module.exports = {
	clearHash(key: any) {
		client.del(JSON.stringify(key));
	},
};
