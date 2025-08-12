export interface AuthRequest {
  name: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

declare global {
  namespace Express {
    interface Request {
      isAuthenticated?: boolean;
    }
  }
}
