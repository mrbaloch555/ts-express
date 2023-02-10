import { Request, Response, NextFunction } from "express";
import responseHandler from "../app/src/middlewares/responseHandler";

export const AsyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
