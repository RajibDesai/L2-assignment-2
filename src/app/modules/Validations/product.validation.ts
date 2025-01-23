import { z } from 'zod';

export const productValidationSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number().min(0, 'Price must be positive'),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']),
  description: z.string().optional(),
  quantity: z.number().min(0),
  inStock: z.boolean(),
});
