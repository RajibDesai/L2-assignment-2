import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/modules/routes/product.route';
import orderRouter from './app/modules/routes/order.route';
import { errorHandler } from './app/modules/middlewares/error.middleware';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// Error Handling Middleware
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bike Store API!');
});

export default app;
