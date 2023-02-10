import { Token, User } from "../../../../database/models";
import { TokenTypes } from "../../../../database/models/interfaces/token.interface";
import { BadRequestError } from "../../../../errors/badRequest.error";

const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: TokenTypes.refresh,
    blacklisted: false,
  });

  if (!refreshTokenDoc) {
    throw new BadRequestError("Invalid refresh token");
  }

  const updatedUser = await User.findById(refreshTokenDoc.user);

  if (!updatedUser) {
    throw new BadRequestError("No user found");
  }

  updatedUser.active = false;
  await updatedUser.save();
  await refreshTokenDoc.remove();
};

export { logout };
