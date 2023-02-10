import mongoose from "mongoose";
import { Options, PaginationResult } from "./paginates.interface";

export interface UserAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photoPath?: string;
  address?: string;
  phone?: string;
  role?: string;
  suspend?: boolean;
  active?: boolean;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photoPath: string;
  address: string;
  phone: string;
  role: string;
  suspend: boolean;
  active: boolean;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  isEmailTaken(email: string): Promise<UserDoc>;
  paginate(filter: object, options: Options): Promise<PaginationResult>;
}
