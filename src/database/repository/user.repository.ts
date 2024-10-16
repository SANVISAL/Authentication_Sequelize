import { inject, injectable } from "inversify";
import { User } from "../../../models/user.model";
import { IUser } from "../../interface/common";

@injectable()
export default class UserRepository {
  public async getAllUser(): Promise<User[]> {
    try {
      const users = await User.findAll({
        where: {
          deletedAt: null,
        },
      });
      console.log("User:", users);
      return users;
    } catch (err) {
      console.error("Error fetching user data:", err);
      throw err;
    }
  }
  public async getUserById(id: number): Promise<User | null> {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      throw err;
    }
  }
  // public async create(data: IUser): Promise<User> {
  //   try {
  //     const user = await User.create(data as any);
  //     console.log("User :", user);
  //     return user;
  //   } catch (err) {
  //     console.error("Error creating user:", err);
  //     throw err;
  //   }
  // }
  public async update(id: number, data: Partial<IUser>): Promise<User> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedUser = await user.update(data);
      return updatedUser;
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  }
  public async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (err) {
      console.error("Error fetching user by email:", err);
      throw err;
    }
  }
  public async delete(id: number, forceDelete = false): Promise<void> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await User.destroy({ where: { id: user.id }, force: forceDelete });
      console.log("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }
}
