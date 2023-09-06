import { Product } from "../../../models/product";
import { badRequest, created, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { CreateProductParams, ICreateProductRepository } from "./protocols";

export class CreateProductController implements IController {
  constructor(createProductRepository: ICreateProductRepository) {
    this.createProductRepository = createProductRepository;
  }

  createProductRepository: ICreateProductRepository;

  async handle(
    httpRequest: IHttpRequest<CreateProductParams>
  ): Promise<IHttpResponse<Product | string>> {
    try {
      const requiredFields = [
        "category",
        "productName",
        "images",
        "brand",
        "description",
        "shorDescription",
        "colors",
        "sizes",
        "price",
      ];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateProductParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const product: Product = await this.createProductRepository.createProduct(
        httpRequest.body!
      );

      return created<Product>(product);
    } catch (error) {
      return serverError();
    }
  }
}
