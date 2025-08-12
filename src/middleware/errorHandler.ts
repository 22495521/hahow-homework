import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  // Axios 錯誤
  if (err.response?.status === 404) {
    return sendError(res, '英雄不存在', 404);
  }

  if (err.response?.status) {
    return sendError(res, '上游 API 錯誤', err.response.status >= 500 ? 502 : err.response.status);
  }

  // 預設錯誤
  sendError(res, '伺服器內部錯誤', 500);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(res, '找不到路由', 404);
};