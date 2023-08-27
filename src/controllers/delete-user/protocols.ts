import { User } from "../../models/user";

export interface IDeleteUserRespository {
  deleteUser(id: string): Promise<User>;
}
