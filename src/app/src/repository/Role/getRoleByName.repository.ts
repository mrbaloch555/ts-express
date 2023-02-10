import { RoleDoc } from "../../../../database/models/interfaces/role.interface";
import Role from "../../../../database/models/Role";

const getRoleByName = async (name: string): Promise<RoleDoc | null> => {
  return Role.findOne({ roleName: name });
};

export { getRoleByName };
