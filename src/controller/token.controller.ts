import { inject, injectable } from "inversify";
import { TokenService } from "../service/token.service";
import { Request, Response } from "express";

@injectable()
export class TokenController {
  private _tokenService: TokenService;
  public constructor(_tokenService: TokenService) {
    this._tokenService = _tokenService;
  }

  public async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const token = await this._tokenService.accessNewToken(refreshToken);
      res.status(201).json(token);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
