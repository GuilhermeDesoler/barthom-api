import { Product } from "../../../models/product";
import { ok, serverError } from "../../helpers";
import { IController, IHttpResponse } from "../../protocols";
import { IGetProductsRepository } from "./protocols";

export class GetProductsController implements IController {
  constructor(getProductsRepository: IGetProductsRepository) {
    this.getProductsRepository = getProductsRepository;
  }

  getProductsRepository: IGetProductsRepository;

  async handle(): Promise<IHttpResponse<Product[] | string>> {
    try {
      const products = await this.getProductsRepository.getProducts();

      return ok<Product[]>(products);
    } catch (error) {
      return serverError();
    }
  }
}
