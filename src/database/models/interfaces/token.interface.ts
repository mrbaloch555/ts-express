import mongoose from "mongoose";

export enum TokenTypes {
  refresh = "refresh",
  access = "access",
}
export interface TokenAttrs {
  token: string;
  user: string;
  type: TokenTypes;
  expires: string;
}

export interface TokenDoc extends mongoose.Document {
  token: string;
  user: string;
  type: TokenTypes;
  expires: string;
  blackisted: boolean;
}

export interface TokenModel extends mongoose.Model<TokenDoc> {
  build(attrs: TokenAttrs): TokenDoc;
}
