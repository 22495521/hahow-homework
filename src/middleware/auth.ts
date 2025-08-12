import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { AxiosError } from '../errors/AxiosError';

export interface AuthenticatedRequest extends Request {
  isAuthenticated?: boolean;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name = req.get('Name');
  const password = req.get('Password');

  req.isAuthenticated = false;

  if (name && password) {
    try {
      const response = await axios.post(`${process.env.HAHOW_API_URL}/auth`, {
        name,
        password,
      });

      if (response.status === 200) {
        req.isAuthenticated = true;
      }
    } catch (error) {
      // 驗證失敗時不拋出錯誤，只設定為未驗證狀態
      req.isAuthenticated = false;
      
      // 可以選擇記錄驗證錯誤（僅在開發環境）
      if (process.env.NODE_ENV === 'development' && AxiosError.isAxiosError(error)) {
        console.warn('Authentication failed:', new AxiosError(error).message);
      }
    }
  }

  next();
};