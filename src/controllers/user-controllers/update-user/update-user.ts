import { User } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(updateUserRepository: IUpdateUserRepository) {
    this.updateUserRepository = updateUserRepository;
  }

  updateUserRepository: IUpdateUserRepository;

  async handle(
    httpRequest: IHttpRequest<UpdateUserParams>
  ): Promise<IHttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing user id");
      }

      const allowedFields: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsnotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFields.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsnotAllowedToUpdate) {
        return badRequest("Some recieved field is not allowed");
      }

      const user = await this.updateUserRepository.updateUserById(id, body);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
