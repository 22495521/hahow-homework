import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

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
      req.isAuthenticated = false;
    }
  }

  next();
};