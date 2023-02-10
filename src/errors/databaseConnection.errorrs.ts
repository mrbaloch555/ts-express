import { CustomError } from "./custom/custom.error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reaseon = "Error connecting database";
  constructor(stack?: string) {
    super("Database connection error");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeError() {
    return [
      {
        message: this.message,
        stack: this.stack,
      },
    ];
  }
}
