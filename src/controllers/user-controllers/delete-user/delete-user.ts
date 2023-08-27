import { User } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IDeleteUserRespository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(deleteUserRepository: IDeleteUserRespository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  deleteUserRepository: IDeleteUserRespository;

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id.");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
