import { User } from "../../models/user";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(updateUserRepository: IUpdateUserRepository) {
    this.updateUserRepository = updateUserRepository;
  }

  updateUserRepository: IUpdateUserRepository;

  async handle(
    httpRequest: IHttpRequest<UpdateUserParams>
  ): Promise<IHttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
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
        return {
          statusCode: 400,
          body: "Some recieved field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUserById(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
