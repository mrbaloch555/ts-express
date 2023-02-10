/**
 * @param {}
 * @returns {Result[]}
 */

import { RoleDoc } from "../../../../database/models/interfaces/role.interface";
import Role from "../../../../database/models/Role";

const queryRoles = async (): Promise<RoleDoc[]> => {
  return await Role.find({});
};

export { queryRoles };
