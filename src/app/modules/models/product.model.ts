import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
    required: true,
  },
  description: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, required: true },
});

export const Product = model<IProduct>('Product', productSchema);
