import { Product } from "../models/product";
import { User } from "../models/user";

export type MongoUser = Omit<User, "id">;
export type MongoProduct = Omit<Product, "id">;
