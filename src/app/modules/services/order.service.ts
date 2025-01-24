import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrder = async (data: any) => {
  const product = await Product.findById(data.product);
  if (!product) throw new Error('Product not found');

  if (product.quantity < data.quantity) throw new Error('Insufficient stock');

  product.quantity -= data.quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  return await Order.create(data);
};

export const calculateRevenue = async () => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return orders[0]?.totalRevenue || 0;
};
