import { injectable } from "inversify";
import { AuthService } from "../service/auth.service";
import { Request, Response } from "express";

@injectable()
export class AuthController {
  private _authService: AuthService;
  public constructor(authService: AuthService) {
    this._authService = authService;
  }

  public register = async (req: Request, res: Response) => {
    try {
      const roleId = 2;
      const user = req.body;
      const userData = { ...user, roleId };
      console.log("user:", userData);
      const newUser = await this._authService.register(userData);
      res.status(201).json(newUser);
    } catch (err: unknown) {
      throw err;
    }
  };
}
