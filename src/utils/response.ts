import { Response } from 'express';

export const sendSuccess = <T>(res: Response, data: T, message?: string): void => {
  res.json({
    success: true,
    data,
    message
  });
};

export const sendError = (res: Response, message: string, statusCode: number = 500): void => {
  res.status(statusCode).json({
    success: false,
    error: message
  });
};