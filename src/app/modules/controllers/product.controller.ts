import { Request, Response } from 'express';
import { Product } from '../models/product.model.js';
import { productValidationSchema } from '../Validations/product.validation.js';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productValidationSchema.parse(req.body);
    const product = new Product(validatedData);
    const savedProduct = await product.save();

    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create bike', success: false, error });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve bikes', success: false, error });
  }
};
