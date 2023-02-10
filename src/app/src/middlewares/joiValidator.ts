import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi, { Schema } from "joi";
import { BadRequestError } from "../../../errors/badRequest.error";
import { RequestValidationError } from "../../../errors/requestValidation.error";
import { pick } from "../../../utils/pick";

const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    let data = { ...req.body };
    if (Object.keys(data).length > 0) {
      for (let key in data) {
        try {
          data[key] = JSON.parse(data[key]);
        } catch (error) {
          continue;
        }
      }
    }

    req.body = data;

    const validSchema = pick(schema, ["params", "query", "body"]);

    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .options({ abortEarly: false })
      .prefs({
        errors: { label: "key" },
      })
      .validate(object);

    if (error) {
      const errorMessage = error.details.map((details) => {
        return {
          message: details.message,
          path: details.path[1],
        };
      });
      // @ts-ignore
      return next(new RequestValidationError(errorMessage));
    }

    Object.assign(req, value);
    return next();
  };

export default validate;
