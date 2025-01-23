import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  const statusCode = (err as { status?: number }).status || 500;
  res.status(statusCode).json({
    message: (err as { message?: string }).message || 'Internal Server Error',
    success: false,
    stack: (err as { stack?: string }).stack,
  });
};
