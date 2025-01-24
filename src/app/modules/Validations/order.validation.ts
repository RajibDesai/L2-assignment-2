import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email('Invalid email address'), // Validates email
  product: z.string().nonempty('Product ID is required'), // Ensures product ID is not empty
  quantity: z.number().min(1, 'Quantity must be at least 1'), // Ensures quantity is at least 1
  totalPrice: z.number().min(0, 'Total price must be positive'), // Ensures total price is positive
});
