import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email('Invalid email'),
  product: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().min(0),
});
