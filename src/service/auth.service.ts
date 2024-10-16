import { inject, injectable } from "inversify";
import AuthRepository from "../database/repository/auth.repository";
import { IToken, IUser, ResponseToken } from "../interface/common";
import { Token, User } from "../../models";
import { RoleRepository } from "../database/repository/role.repository";
import { HttpException } from "../utils/http-acception";
import { StatusCode } from "../utils/const/status-code";
import { generateToken, getExpiryDate } from "../utils/jwt/jwt";
import { TokenRepository } from "../database/repository/token.repository";
import { ApiError } from "../utils/api-error";

@injectable()
export class AuthService {
  private _authRepository: AuthRepository;
  private _roleRepository: RoleRepository;
  private _tokenRepository: TokenRepository;
  constructor(
    @inject(AuthRepository) authRepository: AuthRepository,
    @inject(RoleRepository) roleRepository: RoleRepository,
    @inject(TokenRepository) tokenRepository: TokenRepository
  ) {
    this._authRepository = authRepository;
    this._roleRepository = roleRepository;
    this._tokenRepository = tokenRepository;
  }
  public async register(
    data: IUser
  ): Promise<{ user: User; token: ResponseToken }> {
    try {
      console.log("roleId:", data.roleId);
      const role = await this._roleRepository.findRoleById(data.roleId);
      const user = await this._authRepository.register(data);
      if (!user) {
        throw new HttpException("User creation failed.", StatusCode.BadRequest);
      }
      //  GENERATE TOKE
      const name = role?.name;
      const token = await generateToken(user, name as string);

      const issuerToken: IToken = {
        userId: user.id,
        refreshToken: token.refreshToken,
        expireAt: getExpiryDate(),
      };
      // ADD REFRESH TOKEN TO TABLE TOKEN
      await this._tokenRepository.issuer(issuerToken);
      return { user, token };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error("Error creating user:", err);
      throw new ApiError("Registration failed.");
    }
  }
}
