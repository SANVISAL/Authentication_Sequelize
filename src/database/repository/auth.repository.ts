import { injectable } from "inversify";
import { User } from "../../../models";
import { IUser } from "../../interface/common";

@injectable()
export default class AuthRepository {
  public async register(data: IUser): Promise<User> {
    try {
      const user = await User.create(data as any);
      console.log("User :", user);
      return user;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }
}
