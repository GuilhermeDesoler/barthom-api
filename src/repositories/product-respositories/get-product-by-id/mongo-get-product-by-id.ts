import { ObjectId } from "mongodb";
import { IGetProductByIdRepository } from "../../../controllers/product-controllers/get-product-by-id/protocols";
import { MongoClient } from "../../../database/mongo";
import { Product } from "../../../models/product";
import { MongoProduct } from "../../mongo-protocol";

export class MongoGetProductByIdRepositoryImpl
  implements IGetProductByIdRepository
{
  async getProductById(id: string): Promise<Product> {
    const product = await MongoClient.db
      .collection<MongoProduct>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Product not found");
    }

    const { _id, ...rest } = product;

    return { id: _id.toHexString(), ...rest };
  }
}
