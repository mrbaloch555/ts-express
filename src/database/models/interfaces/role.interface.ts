import mongoose from "mongoose";

export interface RoleAttrs {
  roleName: string;
  rolePrivileges: string[];
}

export interface RoleDoc extends mongoose.Document {
  roleName: string;
  rolePrivileges: string[];
}

export interface RoleModel extends mongoose.Model<RoleDoc> {
  build(attrs: RoleAttrs): RoleDoc;
}
