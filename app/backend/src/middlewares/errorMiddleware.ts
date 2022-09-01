import { NextFunction, Response, Request } from 'express';

interface errorMiddleware extends Error {
  statusCode: number;
}

export default (
  error: errorMiddleware,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(error.statusCode || 500).json({ message: error.message });
};
