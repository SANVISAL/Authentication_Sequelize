import { injectable, inject } from "inversify";
import UserRepository from "../database/repository/user.repository";
import { TokenRepository } from "../database/repository/token.repository";
import { RoleRepository } from "../database/repository/role.repository";
import { Token } from "../../models";
@injectable()
export class UserService {
  private _userRepository: UserRepository;
  private _tokenRepository: TokenRepository;
  private _roleRepository: RoleRepository;

  public constructor(
    @inject(UserRepository) userRepository: UserRepository,
    @inject(TokenRepository) tokenRepository: TokenRepository,
    @inject(RoleRepository) roleRepository: RoleRepository
  ) {
    this._userRepository = userRepository;
    this._tokenRepository = tokenRepository;
    this._roleRepository = roleRepository;
  }
  public async getAllUsers(): Promise<Token[]> {
    try {
      // const users = await this._userRepository.getAllUser();
      const token = await this._tokenRepository.getAllRefreshToken();
      return token;
    } catch (err) {
      console.error("Error fetching all users:", err);
      throw err;
    }
  }
  // public async createUser(
  //   data: IUser
  // ): Promise<{ user: User; token: ResponseToken }> {
  //   try {
  //     console.log("roleId:", data.roleId);
  //     const role = await this._roleRepository.findRoleById(data.roleId);
  //     const user = await this._userRepository.create(data);
  //     if (!user) {
  //       throw new HttpException("User creation failed.", StatusCode.BadRequest);
  //     }
  //     //  GENERATE TOKE
  //     const name = role?.name;
  //     const token = await generateToken(user, name as string);

  //     const issuerToken: IToken = {
  //       userId: user.id,
  //       refreshToken: token.refreshToken,
  //       expiresAt: getExpiryDate(),
  //     };
  //     // ADD REFRESH TOKEN TO TABLE TOKEN
  //     await this._tokenRepository.issuer(issuerToken);
  //     return { user, token };
  //   } catch (err) {
  //     if (err instanceof HttpException) {
  //       throw err;
  //     }
  //     console.error("Error creating user:", err);
  //     throw new ApiError("Registration failed.");
  //   }
  // }
  public async deleteUser(id: number): Promise<void> {
    try {
      await this._tokenRepository.deleteRefreshToken(id, true);
      await this._userRepository.delete(id, true);
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }
}
