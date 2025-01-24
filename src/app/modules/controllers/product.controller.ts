/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import * as ProductService from '../services/product.service';
import { ProductQuery } from '../interfaces/product.interface';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({
      message: 'Product created successfully',
      success: true,
      data: product,
    });
  } catch (error: any) {
    next({
      status: 400,
      message: error.message || 'Failed to create product',
    });
  }
};

export const getAllProducts = async (
  req: Request<object, object, object, ProductQuery>, // Query টাইপ ব্যবহার
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: products,
    });
  } catch (error: any) {
    next({
      status: 400,
      message: error.message || 'Failed to create product',
    });
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductService.getProductById(req.params.productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found', success: false });
    }
    res.status(200).json({
      message: 'Bike retrieved successfully',
      success: true,
      data: product,
    });
  } catch (error: any) {
    next({
      status: 400,
      message: error.message || 'Failed to create product',
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedProduct = await ProductService.updateProduct(
      req.params.productId,
      req.body
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
