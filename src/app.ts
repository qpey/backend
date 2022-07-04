import express, { Express, Request, Response } from 'express';
import { NotAuthorizedError } from './errors';
import { errorHandler } from './middlewares';

const app: Express = express();

app.set('trust proxy', true);

app.all('*', async (req: Request, res: Response): Promise<never> => {
	throw new NotAuthorizedError('Route to resource not Found');
});

app.get('/', (req: Request, res: Response) => res.send('Hello there !'));

app.use(errorHandler);

export { app };
