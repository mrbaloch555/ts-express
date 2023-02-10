import jwt from "jsonwebtoken";
import { TokenTypes } from "../../../../database/models/interfaces/token.interface";

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const createJwtToken = ({
  userId,
  expiresIn,
  type,
  secret,
}: {
  userId: string;
  expiresIn: string;
  type: TokenTypes;
  secret: string;
}) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    expiresIn: expiresIn,
    type,
  };

  return jwt.sign(payload, secret);
};

export { createJwtToken };
