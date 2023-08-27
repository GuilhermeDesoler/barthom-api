import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepositoryImpl implements IGetUsersRepository {
  async getUSers(): Promise<User[]> {
    return [
      {
        firstName: "Guilherme",
        lastName: "Desoler",
        email: "guilherme.desoler@gmail.com",
        password: "123456",
      },
    ];
  }
}
