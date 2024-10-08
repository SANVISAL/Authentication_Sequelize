import { inject, injectable } from "inversify";
import { TokenRepository } from "../database/repository/token.repository";
import { generateToken, verifyToken } from "../utils/jwt/jwt";
import UserRepository from "../database/repository/user.repository";

@injectable()
export class TokenService {
  private _tokenRepository: TokenRepository;
  private _userRepository: UserRepository;
  constructor(
    @inject(TokenRepository)
    tokenRepository: TokenRepository,
    @inject(UserRepository)
    userRepository: UserRepository
  ) {
    this._tokenRepository = tokenRepository;
    this._userRepository = userRepository;
  }
  public async accessNewToken(refreshToken: string) {
    try {
      const decoded = await verifyToken(refreshToken);
      if (!decoded || !decoded.userId) {
        throw new Error("Invalid refresh token");
      }
      const { userId } = decoded;
      const user = await this._userRepository.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const newToken = await generateToken(user);
      return newToken;
    } catch (error) {
      throw new Error("Failed to generate new access token");
    }
  }
}
