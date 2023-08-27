import { Product } from "../../../models/product";

export interface IGetProductByIdRepository {
  getProductById(id: string): Promise<Product>;
}
