export interface IProduct {
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
  searchTerm?: string; // Optional, সার্চের জন্য
}
