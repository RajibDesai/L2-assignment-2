import { NextFunction, Request, Response } from 'express';
import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { orderValidationSchema } from '../Validations/order.validation.js';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = orderValidationSchema.parse(req.body);
    const product = await Product.findById(validatedData.product);

    if (!product) {
      res.status(404).json({
        message: 'Product not found',
        success: false,
      });
      return;
    }

    // Order creation logic
    const order = await Order.create(validatedData);

    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const calculateRevenue = async (_req: Request, res: Response) => {
  try {
    const revenue = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue: revenue[0]?.totalRevenue || 0 },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to calculate revenue', success: false, error });
  }
};
