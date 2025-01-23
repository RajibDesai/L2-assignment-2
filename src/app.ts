import express, { Application, Request, Response } from 'express';
import productRoutes from '../src/app/modules/routes/product.route.js';
import orderRoutes from '../src/app/modules/routes/order.route.js';
import { errorHandler } from './app/modules/middlewares/error.middleware.js';
const app: Application = express();
import cors from 'cors';

// persar
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the API!');
});

app.use(errorHandler);

export default app;
