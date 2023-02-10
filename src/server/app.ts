import express, { NextFunction, Request, Response } from "express";
import { ApiNotFoundError } from "../errors/apiNotFound.error";
import "express-async-errors";
import logRequest from "../app/src/middlewares/logRequest";
import config from "../config/config";
import { successHanlder, morganErrorHandler } from "../config/morgan";
import { errorHandler } from "../app/src/middlewares/error.handler";
import passport from "passport";
import jwtStrategy from "../config/passport";
import authLimiter from "../config/authLimiter";
import validate from "../app/src/middlewares/joiValidator";
import { authValidation } from "../app/src/validations";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { router } from "../app/src/routes";

const app = express();

if (config.env !== "test") {
  app.use(successHanlder);
  app.use(morganErrorHandler);
}

// Set security HTTO headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// Static files
app.use(express.static("public"));
// Jwt
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "pod") {
  app.use("/auth", authLimiter);
}
// Body Parserr
app.use(express.json());
app.use(express.urlencoded({ limit: "500mb", extended: true }));

app.set("trust proxy", true);

// To remove data using these defaults:
app.use(mongoSanitize());
// Log Requests
if (config.env !== "test") app.use(logRequest);

app.use(router);
app.get("/", (req: Request, res: Response) => {
  res.send({ msg: "Welcome to Typescript!!" });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ApiNotFoundError());
});

app.use(errorHandler);

export default app;
