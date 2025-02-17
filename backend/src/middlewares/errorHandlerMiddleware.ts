import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("message from errorHandlerMiddleware:", err);
  res.status(500).json({
    msg: err instanceof Error ? err.message : "An unknown error occurred",
  });
  return; 
};
