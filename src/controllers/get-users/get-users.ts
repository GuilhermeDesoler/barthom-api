import { User } from "../../models/user";
import { IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(getUsersRepository: IGetUsersRepository) {
    this.getUsersRepository = getUsersRepository;
  }

  getUsersRepository: IGetUsersRepository;

  async handle() {
    try {
      const users: User[] = await this.getUsersRepository.getUsers();
      return {
        statusCode: 500,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
