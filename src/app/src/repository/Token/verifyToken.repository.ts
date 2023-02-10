import jwt from "jsonwebtoken";
import config from "../../../../config/config";
import { Token } from "../../../../database/models";
import { TokenTypes } from "../../../../database/models/interfaces/token.interface";
/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: TokenTypes) => {
  const payload = jwt.verify(token, config.jwtScret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

export { verifyToken };
