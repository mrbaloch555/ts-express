import morgan from "morgan";
import config from "./config";
import { Request, Response } from "express";
import { logger } from "./logger";

morgan.token(
  "message",
  (req: Request, res: Response) => res.locals.errorMessage || ""
);

const getIpFormat = () =>
  config.env === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHanlder = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const morganErrorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export { successHanlder, morganErrorHandler };
