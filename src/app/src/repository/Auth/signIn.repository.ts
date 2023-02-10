import { User } from "../../../../database/models";
import {
  UserAttrs,
  UserDoc,
} from "../../../../database/models/interfaces/user.interface";
import { Password } from "../../../../database/models/services/password";
import { BadRequestError } from "../../../../errors/badRequest.error";

/**
 *
 * @param userBody
 * @returns {Promise<UserDoc>}
 */
const signIn = async (email: string, password: string): Promise<UserDoc> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("Invlid Email or Password");
  }

  if (!(await Password.compare(user.password, password))) {
    throw new BadRequestError("Invalid Email or Password");
  }

  return user;
};

export { signIn };
