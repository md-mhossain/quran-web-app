import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: false,
    error: "Internal Server Error",
    message: err.message || "Something went wrong!",
  });
};