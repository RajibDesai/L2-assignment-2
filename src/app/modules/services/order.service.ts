import { IOrder } from '../interfaces/order.interface.js';
import { IProduct } from '../interfaces/product.interface.js';
import { Order } from '../models/order.model.js';

export const createOrder = async (
  orderData: Partial<IOrder>, //  Partial<IOrder> ব্যবহার করুন
  product: IProduct
): Promise<IOrder> => {
  // Check inventory availability
  if (product.quantity < orderData.quantity!) {
    throw new Error('Insufficient stock available');
  }

  // Reduce product stock
  product.quantity -= orderData.quantity!;

  // Update inStock status if quantity is 0
  if (product.quantity === 0) {
    product.inStock = false;
  }

  // Save the updated product details
  await product.save();

  // Calculate total price
  const totalPrice = (orderData.quantity || 0) * product.price;

  // Create the order
  const order = await Order.create({
    ...orderData,
    totalPrice,
  });

  return order;
};

export const calculateRevenue = async (): Promise<number> => {
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: 'products', // Product collection এর সাথে যোগ
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' }, // Array ফরম্যাট ঠিক করার জন্য
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $multiply: ['$quantity', '$productDetails.price'] },
        },
      },
    },
  ]);

  return orders[0]?.totalRevenue || 0;
};
