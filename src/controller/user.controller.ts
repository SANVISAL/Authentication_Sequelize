import { injectable } from "inversify";
import { UserService } from "../service/user.service";
import { Request, Response } from "express";

@injectable()
export class UserController {
  private _userService: UserService;

  public constructor(_userService: UserService) {
    this._userService = _userService;
  }
  public getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this._userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching all users:", err);
      res.status(500).send(err);
    }
  };
  // public createUser = async (req: Request, res: Response) => {
  //   try {
  //     const userData = req.body;
  //     console.log("user:", userData);
  //     const newUser = await this._userService.createUser(userData);
  //     res.status(201).json(newUser);
  //   } catch (err: unknown) {
  //     throw err;
  //   }
  // };
  public deleteUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await this._userService.deleteUser(id);
      res.status(204).json("Success Deleted");
    } catch (err) {
      throw err;
    }
  };

  // public updateUser = async (req: Request, res: Response) => {
  //   try {
  //     const updatedUser = await this._userService.updateUser(
  //       parseInt(req.params.id),
  //       req.body
  //     );
  //     res.json(updatedUser);
  //   } catch (err) {
  //     console.error("Error updating user:", err);
  //     res.status(400).send(err);
  //   }
  // };

  // public deleteUser = async (req: Request, res: Response) => {
  //   try {
  //     await this._userService.deleteUser(req.params.id);
  //     res.status(204).send();
  //   } catch (err) {
  //     console.error("Error deleting user:", err);
  //     res.status(500).send(err);
  //   }
  // };
}
