import { Request, Response, NextFunction } from 'express';
import { idSchema } from '../validators/schemas';

// 統一驗證網址中的 :id 參數
export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = idSchema.validate(Number(req.params.id));

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      message: error.details[0].message,
    });
  }

  next();
};
