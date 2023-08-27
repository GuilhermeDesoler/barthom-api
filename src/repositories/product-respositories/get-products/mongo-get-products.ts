import { IGetProductsRepository } from "../../../controllers/product-controllers/get-products/protocols";
import { MongoClient } from "../../../database/mongo";
import { Product } from "../../../models/product";
import { MongoProduct } from "../../mongo-protocol";

export class MongoGetProductsRepositoryImpl implements IGetProductsRepository {
  async getProducts(): Promise<Product[]> {
    const products = await MongoClient.db
      .collection<MongoProduct>("products")
      .find({})
      .toArray();

    return products.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }));
  }
}
