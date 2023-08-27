import { User } from "../../../models/user";
import { IController, IHttpResponse } from "../../protocols";
import { IGetUsersRepository } from "./protocols";
import { ok, serverError } from "../../helpers";

export class GetUsersController implements IController {
  constructor(getUsersRepository: IGetUsersRepository) {
    this.getUsersRepository = getUsersRepository;
  }

  getUsersRepository: IGetUsersRepository;

  async handle(): Promise<IHttpResponse<User[] | string>> {
    try {
      const users: User[] = await this.getUsersRepository.getUsers();
      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
