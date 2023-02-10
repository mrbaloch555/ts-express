import mongoose from "mongoose";
import config from "../../config/config";
import { UserAttrs, UserDoc, UserModel } from "./interfaces/user.interface";
import paginate from "./plugins/paginate";
import { Password } from "./services/password";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    photoPath: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "User",
    },
    suspend: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        if (ret.photoPath) {
          ret.photoPath = config.rootPath + ret.photoPath;
        }
      },
    },
    timestamps: true,
  }
);
userSchema.plugin(paginate);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export default User;
