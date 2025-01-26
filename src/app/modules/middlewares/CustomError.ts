/* export class CustomError extends Error {
  public status: number;
  public errors?: Record<string, unknown>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    this.errors = errors;

    // Stack trace সংরক্ষণ করে
    Error.captureStackTrace(this, this.constructor);
  }
} */

export class CustomError extends Error {
  public status: number;
  public errors?: Record<string, unknown>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    this.errors = errors;

    // Stack trace সংরক্ষণ (Node.js Error Object এর অংশ)
    Error.captureStackTrace(this, this.constructor);
  }
}
