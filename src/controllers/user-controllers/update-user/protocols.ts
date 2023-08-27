import { User } from "../../../models/user";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUserById(id: string, params: UpdateUserParams): Promise<User>;
}
