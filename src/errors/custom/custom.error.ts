export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string, stack?: string) {
    super(message);
    // Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeError(): {
    message: string;
    feild?: string;
    stack?: string;
  }[];
}
