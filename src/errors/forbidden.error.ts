import httpStatus from "http-status";
import { CustomError } from "./custom/custom.error";

export class ApiForbidden extends CustomError {
  statusCode = httpStatus.FORBIDDEN;

  constructor(stack?: string) {
    super("Forbidden");
    Object.setPrototypeOf(this, ApiForbidden);
  }

  serializeError() {
    return [{ message: "Forbidden", stack: this.stack }];
  }
}
