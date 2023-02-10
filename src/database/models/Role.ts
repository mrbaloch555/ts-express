import mongoose from "mongoose";
import { RoleAttrs, RoleDoc, RoleModel } from "./interfaces/role.interface";
const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    rolePrivileges: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model<RoleDoc, RoleModel>("Role", roleSchema);

export default Role;
