import { User } from "../../models/user";
import { IHttpRequest, IHttpResponse } from "../protocols";

export interface ICreateUserController {
  handle(
    httRequest: IHttpRequest<CreateUserParams>
  ): Promise<IHttpResponse<User>>;
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
