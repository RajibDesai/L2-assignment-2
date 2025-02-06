/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import productRouter from './app/modules/routes/product.route';
import orderRouter from './app/modules/routes/order.route';
import {
  errorHandler,
  notFoundHandler,
} from './app/modules/middlewares/error.middleware';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bike Store API!');
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// Catch-all handler for any routes that don't match
app.use(notFoundHandler);

export default app;

/* 
scripts": {
    "start": "node ./dist/server.js",
    "prod": "nodemon ./dist/server.js",
    "dev": "nodemon --watch src --exec tsx ./src/server.ts",
    "build": "tsc"
}
*/
