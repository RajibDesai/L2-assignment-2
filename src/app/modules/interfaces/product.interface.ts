import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
}

// Query টাইপ সংজ্ঞায়িত
export interface ProductQuery {
  searchTerm?: string; // সার্চের জন্য
}
