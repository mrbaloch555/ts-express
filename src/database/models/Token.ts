import mongoose from "mongoose";
import {
  TokenAttrs,
  TokenDoc,
  TokenModel,
  TokenTypes,
} from "./interfaces/token.interface";

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: TokenTypes,
      required: true,
    },
    expires: {
      type: String,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

tokenSchema.statics.build = (attrs: TokenAttrs) => {
  return new Token(attrs);
};

const Token = mongoose.model<TokenDoc, TokenModel>("Token", tokenSchema);

export default Token;
