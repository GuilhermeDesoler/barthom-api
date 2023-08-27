export interface Product {
  id: string;
  category: string;
  productName: string;
  images: string[];
  brand: string;
  description: string;
  shortDescription: string;
  colors: string[];
  sizes: string[];
  price: number;
  createdAt: Date;
}
