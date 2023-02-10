import Joi from "joi";
import { CustomError } from "./custom/custom.error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: { message: string; path: string }[]) {
    super("Validation Error");
    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeError() {
    return this.errors.map((err) => {
      return { message: err.message, feild: err.path };
    });
  }
}
