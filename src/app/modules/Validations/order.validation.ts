import { z } from 'zod';

// Regular expression to match ObjectId (24 hex characters)
const objectIdPattern = /^[a-fA-F0-9]{24}$/;

export const orderValidationSchema = z.object({
  email: z.string().email('Invalid email address'), // Validates email
  product: z.string().refine((val) => objectIdPattern.test(val), {
    message: 'Invalid Product ID', // Custom validation for Product ID
  }), // Ensures product ID is a valid ObjectId string
  quantity: z.number().min(1, 'Quantity must be at least 1'), // Ensures quantity is at least 1
  totalPrice: z.number().min(0, 'Total price must be positive'), // Ensures total price is positive
});
