import { Container } from "inversify";
import { UserController } from "../controller/user.controller";
import UserRepository from "../database/repository/user.repository";
import { UserService } from "../service/user.service";
import { TokenRepository } from "../../src/database/repository/token.repository";
import { TokenService } from "../service/token.service";
import { TokenController } from "../controller/token.controller";

const container = new Container();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<UserController>(UserController).toSelf();

container.bind<TokenRepository>(TokenRepository).toSelf();
container.bind<TokenService>(TokenService).toSelf();
container.bind<TokenController>(TokenController).toSelf();
export { container };
