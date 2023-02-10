import { logger } from "../../../config/logger";
import { Request, Response, NextFunction } from "express";
export default function (req: Request, res: Response, next: NextFunction) {
  logger.info(`Request URL: ${req.url}`);
  logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  next();
}
