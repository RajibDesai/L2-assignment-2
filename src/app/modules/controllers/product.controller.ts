/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as ProductService from '../services/product.service';
import { ProductQuery } from '../interfaces/product.interface';
import {
  productValidationSchema,
  updateProductValidationSchema,
} from '../Validations/product.validation';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = productValidationSchema.parse(req.body); // Zod Validation
    // ভ্যালিড ডেটা দিয়ে প্রোডাক্ট তৈরি করা
    const product = await ProductService.createProduct(validatedData); // যদি ভ্যালিডেশন সফল হয়, পরবর্তী মিডলওয়্যারে যায়

    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: product,
    });
  } catch (error) {
    next(error); // যদি ব্যর্থ হয়, Error Middleware-এ পাঠাবে
  }
};

export const getAllProducts = async (
  req: Request<object, object, object, ProductQuery>, // Use Query Type
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: products,
    });
  } catch (error) {
    next(error); // Pass error to the middleware
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    // ObjectI যাচাই করা
    if (!mongoose.isValidObjectId(productId)) {
      res.status(400).json({
        message: 'Invalid Bike ID',
        success: false,
      });
    }

    const product = await ProductService.getProductById(productId);
    if (!product) {
      res.status(404).json({ message: 'Bike not found', success: false });
    }
    res.status(200).json({
      message: 'Bike retrieved successfully',
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      res.status(404).json({ message: 'Product not found', success: false });
    }
    res.status(200).json({
      message: 'Product updated successfully',
      success: true,
      data: updatedProduct,
    });
  } catch (error: any) {
    next({
      status: 400,
      message: error.message || 'Failed to create product',
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedProduct = await ProductService.deleteProduct(
      req.params.productId
    );
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found', success: false });
    }
    res
      .status(200)
      .json({ message: 'Product deleted successfully', success: true });
  } catch (error: any) {
    next({
      status: 400,
      message: error.message || 'Failed to create product',
    });
  }
};
