import { CustomError } from "./custom/custom.error";

export class ApiNotFoundError extends CustomError {
  statusCode = 404;
  constructor(stack?: string) {
    super("API not found!");
    Object.setPrototypeOf(this, ApiNotFoundError.prototype);
  }

  serializeError() {
    return [{ message: "API not found!", stack: this.stack }];
  }
}
