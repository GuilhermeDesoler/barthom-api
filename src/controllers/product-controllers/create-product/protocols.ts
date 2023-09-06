import { Product } from "../../../models/product";

export interface CreateProductParams {
  category: string;
  productName: string;
  images: string[];
  brand: string;
  description: string;
  shorDescription: string;
  colors: string[];
  sizes: string[];
  price: number;
}

export interface ICreateProductRepository {
  createProduct(params: CreateProductParams): Promise<Product>;
}
