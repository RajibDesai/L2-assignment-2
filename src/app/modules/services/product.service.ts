/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '../models/product.model';
import { IProduct, ProductQuery } from '../interfaces/product.interface';

// Create a product
export const createProduct = async (productData: Omit<IProduct, 'save'>) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

// Get all products
export const getAllProducts = async (query: ProductQuery) => {
  const searchTerm = query.searchTerm;
  const filter: any = {};

  if (searchTerm) {
    filter.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  return Product.find(filter);
};

// Get product by ID
export const getProductById = async (bikeId: string) => {
  return Product.findById(bikeId);
};

// Update a product
export const updateProduct = async (
  productId: string,
  productData: Partial<IProduct>
) => {
  return Product.findByIdAndUpdate(productId, productData, { new: true });
};

// Delete a product
export const deleteProduct = async (productId: string) => {
  return Product.findByIdAndDelete(productId);
};
