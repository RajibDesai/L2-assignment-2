import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as OrderService from '../services/order.service.js';
import { Product } from '../models/product.model.js';
import { orderValidationSchema } from '../Validations/order.validation.js';
import { IOrder } from '../interfaces/order.interface.js';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderData = req.body;

    if (!orderData) {
      res.status(400).json({ message: 'Order data is missing', status: false });
      return;
    }

    // Validate Order Data
    const validatedData = orderValidationSchema.parse(orderData);

    // Convert product ID to ObjectId
    const productId = new mongoose.Types.ObjectId(validatedData.product);

    // Fetch product from database
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: 'Product not found', status: false });
      return;
    }

    const orderDataWithObjectId: Partial<IOrder> = {
      email: validatedData.email,
      product: productId,
      quantity: validatedData.quantity,
      totalPrice: validatedData.quantity * product.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Call service layer with correct types
    const order = await OrderService.createOrder(
      orderDataWithObjectId,
      product
    );

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: {
        _id: order._id,
        email: order.email,
        product: order.product,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const calculateRevenue = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Call service layer
    const totalRevenue = await OrderService.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error) {
    next(error);
  }
};
