import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as ProductService from '../services/product.service.js';
import { IProduct, ProductQuery } from '../interfaces/product.interface.js';
import {
  productValidationSchema,
  updateProductValidationSchema,
} from '../Validations/product.validation.js';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bikeData = req.body;
    const validatedData = productValidationSchema.parse(bikeData); // Zod Validation
    // ভ্যালিড ডেটা দিয়ে প্রোডাক্ট তৈরি করা
    const product = await ProductService.createProduct(
      validatedData as Omit<IProduct, 'save'>
    );
    res.status(201).json({
      message: 'Bike created successfully',
      status: true,
      data: product,
    });
    return;
  } catch (error) {
    next(error); // যদি ব্যর্থ হয়, Error Middleware-এ পাঠাবে
  }
};

export const getAllProducts = async (
  req: Request<object, object, object, ProductQuery>, // Use Query Type
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bikesData = req.query;
    const products = await ProductService.getAllProducts(bikesData);
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      status: true,
      data: products,
    });
    return;
  } catch (error) {
    next(error); // Pass error to the middleware
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId } = req.params;
    // ObjectI যাচাই করা
    if (!mongoose.isValidObjectId(productId)) {
      res.status(400).json({
        message: 'Invalid Bike ID',
        status: false,
      });
      return; // ফাংশন এখানেই থেমে যাবে।
    }

    const product = await ProductService.getProductById(productId);
    if (!product) {
      res.status(404).json({ message: 'Bike not found', status: false });
      return; // Explicitly stop execution
    }
    res.status(200).json({
      message: 'Bike retrieved successfully',
      status: true,
      data: product,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId } = req.params;
    const updateProductData = req.body;
    const validatedData =
      updateProductValidationSchema.parse(updateProductData);

    const updatedProduct = await ProductService.updateProduct(
      productId,
      validatedData
    );
    if (!updatedProduct) {
      res.status(404).json({ message: 'Bike not found', status: false });
      return;
    }
    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: updatedProduct,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductService.deleteProduct(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Bike not found', success: false });
      return;
    }
    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: deletedProduct,
    });
    return;
  } catch (error) {
    next(error);
  }
};
