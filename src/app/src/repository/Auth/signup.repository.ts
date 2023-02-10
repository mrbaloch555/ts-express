import { User } from "../../../../database/models";
import {
  UserAttrs,
  UserDoc,
} from "../../../../database/models/interfaces/user.interface";
import { BadRequestError } from "../../../../errors";

/**
 *
 * @param userBody
 * @returns {Promise<UserDoc>}
 */
const signUp = async (userBody: UserAttrs): Promise<UserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new BadRequestError("Email already exists!");
  }
  const user = await User.build(userBody);
  await user.save();

  return user;
};

export { signUp };
