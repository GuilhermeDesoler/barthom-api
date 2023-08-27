import { Product } from "../../../models/product";

export interface IGetProductsRepository {
  getProducts(): Promise<Product[]>;
}
