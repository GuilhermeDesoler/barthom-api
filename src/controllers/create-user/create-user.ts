import { User } from "../../models/user";
import { IHttpRequest, IHttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";
import validator from "validator";

export class CreateUserController implements ICreateUserController {
  constructor(createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  createUserRepository: ICreateUserRepository;

  async handle(
    httpRequest: IHttpRequest<CreateUserParams>
  ): Promise<IHttpResponse<User>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }

      const user: User = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
