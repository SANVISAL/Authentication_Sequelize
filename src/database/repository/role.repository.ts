import { injectable } from "inversify";
import { Role } from "../../../models/role.model";

@injectable()
export class RoleRepository {
  public async createRole(name: string): Promise<Role> {
    try {
      console.log("name:", name);
      const roleName = await Role.create({ name });
      return roleName;
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  }
  public async findRoleById(roleId: number) {
    try {
      const role = await Role.findByPk(roleId);
      return role;
    } catch (error) {
      console.error("Error finding role by ID:", error);
      throw error;
    }
  }
}
