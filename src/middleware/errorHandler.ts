import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { AxiosError } from '../errors/AxiosError';
import { ServiceError } from '../errors/ServiceError';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack);
  }

  // ServiceError 錯誤處理
  if (err instanceof ServiceError) {
    return sendError(res, err.message, err.status);
  }

  // AxiosError 錯誤處理
  if (err instanceof AxiosError) {
    return sendError(res, err.message, err.getHttpStatus());
  }

  // 原生 axios 錯誤轉換
  if (AxiosError.isAxiosError(err)) {
    const axiosError = new AxiosError(err);
    return sendError(res, axiosError.message, axiosError.getHttpStatus());
  }

  // 預設錯誤
  sendError(res, '伺服器內部錯誤', 500);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(res, '找不到路由', 404);
};