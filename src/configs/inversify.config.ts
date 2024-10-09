import { Container } from "inversify";
import { UserController } from "../controller/user.controller";
import UserRepository from "../database/repository/user.repository";
import { UserService } from "../service/user.service";
import { TokenRepository } from "../../src/database/repository/token.repository";
import { TokenService } from "../service/token.service";
import { TokenController } from "../controller/token.controller";
import { RoleController } from "../controller/role.controller";
import { RoleRepository } from "../database/repository/role.repository";
import { RoleService } from "../service/role.service";

const container = new Container();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<UserController>(UserController).toSelf();

container.bind<TokenRepository>(TokenRepository).toSelf();
container.bind<TokenService>(TokenService).toSelf();
container.bind<TokenController>(TokenController).toSelf();

container.bind<RoleController>(RoleController).toSelf();
container.bind<RoleService>(RoleService).toSelf();
container.bind<RoleRepository>(RoleRepository).toSelf();
export { container };
