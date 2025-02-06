import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface.js';

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Invalid email format',
      },
    },
    product: {
      type: Schema.Types.ObjectId, // Refers to the Product Model
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be positive'],
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema);
