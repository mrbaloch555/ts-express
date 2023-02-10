import {
  RoleAttrs,
  RoleDoc,
} from "../../../../database/models/interfaces/role.interface";
import Role from "../../../../database/models/Role";

/**
 *
 * @param roleBody
 * @returns {Promise<RoleDoc>}
 */
const createRole = async (roleBody: RoleAttrs): Promise<RoleDoc> => {
  const role = await Role.build(roleBody);
  return await role.save();
};

export { createRole };
