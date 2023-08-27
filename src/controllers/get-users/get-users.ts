import { User } from "../../models/user";
import { IGetUsersRepository, IGetUsersController } from "./protocols";

export class GetUsersController implements IGetUsersController {
  constructor(getUsersRepository: IGetUsersRepository) {
    this.getUsersRepository = getUsersRepository;
  }

  getUsersRepository: IGetUsersRepository;

  async handle() {
    try {
      const users: User[] = await this.getUsersRepository.getUSers();
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
