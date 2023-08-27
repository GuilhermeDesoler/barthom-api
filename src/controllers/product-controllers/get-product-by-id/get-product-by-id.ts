import { Product } from "../../../models/product";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetProductByIdRepository } from "./protocols";

export class GetProductByIdController implements IController {
  constructor(getProductByIdRepository: IGetProductByIdRepository) {
    this.getProductByIdRepository = getProductByIdRepository;
  }

  getProductByIdRepository: IGetProductByIdRepository;

  async handle(
    httpRequest: IHttpRequest<unknown>
  ): Promise<IHttpResponse<Product | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing product id.");
      }

      const product = await this.getProductByIdRepository.getProductById(id);

      return ok<Product>(product);
    } catch (error) {
      return serverError();
    }
  }
}
