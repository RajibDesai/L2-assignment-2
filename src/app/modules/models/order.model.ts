import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface.js';

const OrderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // বাইকের প্রোডাক্ট রেফারেন্স
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', OrderSchema);
