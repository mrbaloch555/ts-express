import mongoose from "mongoose";
import { RoleDoc } from "../../../../database/models/interfaces/role.interface";
import Role from "../../../../database/models/Role";

/**
 * Get role by name
 * @param {Object Id} id
 * @returns {Promise<RoleDoc>}
 */

const getRoleById = async (
  id: mongoose.Types.ObjectId
): Promise<RoleDoc | null> => {
  const role = await Role.findById(id);
  return role;
};

export { getRoleById };
