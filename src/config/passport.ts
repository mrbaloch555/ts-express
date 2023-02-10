import { User } from "../database/models";
import { BadRequestError } from "../errors/badRequest.error";
import config from "./config";
import tokenTypes from "./tokenTypes";

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtOptions = {
  secretOrKey: config.jwtScret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: Function) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }

    const user = await User.findById(payload.sub);
    if (user) return done(null, user);

    return done(null, false);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
