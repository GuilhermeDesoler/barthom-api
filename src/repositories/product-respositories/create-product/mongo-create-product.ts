import {
  CreateProductParams,
  ICreateProductRepository,
} from "../../../controllers/product-controllers/create-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { Product } from "../../../models/product";
import { MongoProduct } from "../../mongo-protocol";

export class MongoCreateProductRepositoryImpl
  implements ICreateProductRepository
{
  async createProduct(params: CreateProductParams): Promise<Product> {
    const creationDate = new Date();
    
    const { insertedId } = await MongoClient.db
      .collection("products")
      .insertOne({ ...params, createdAt: creationDate.toDateString()});

    const product = await MongoClient.db
      .collection<MongoProduct>("products")
      .findOne({ _id: insertedId });

    if (!product) {
      throw new Error("Product not created");
    }

    const { _id, ...rest } = product;

    return { id: _id.toHexString(), ...rest };
  }
}
