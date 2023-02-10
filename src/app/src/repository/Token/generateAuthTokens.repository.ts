import config from "../../../../config/config";
import { TokenTypes } from "../../../../database/models/interfaces/token.interface";
import { UserDoc } from "../../../../database/models/interfaces/user.interface";
import { createJwtToken } from "./createToken.repository";
import { saveToken } from "./saveToken.respository";

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user: UserDoc) => {
  let accessTokenExpires;
  let refreshTokenExpires;
  accessTokenExpires = config.jwtExpirationAccess;
  refreshTokenExpires = config.jwtExpirationRefresh;

  const accessToken = createJwtToken({
    userId: user.id,
    expiresIn: accessTokenExpires,
    type: TokenTypes.access,
    secret: config.jwtScret,
  });

  const refreshToken = createJwtToken({
    userId: user.id,
    expiresIn: refreshTokenExpires,
    type: TokenTypes.refresh,
    secret: config.jwtScret,
  });

  await saveToken({
    token: refreshToken,
    user: user.id,
    expires: refreshTokenExpires,
    type: TokenTypes.refresh,
  });
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  };
};

export { generateAuthTokens };
