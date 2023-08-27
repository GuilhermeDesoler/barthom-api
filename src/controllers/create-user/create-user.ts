import { User } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import validator from "validator";

export class CreateUserController implements IController {
  constructor(createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  createUserRepository: ICreateUserRepository;

  async handle(
    httpRequest: IHttpRequest<CreateUserParams>
  ): Promise<IHttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid");
      }

      const user: User = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
