import { Request, Response, NextFunction } from 'express';
import { heroService } from '../services/heroService';
import { sendSuccess, sendError } from '../utils/response';

export const getHeroes = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    //是否為已驗證的請求
    console.log(req.isAuthenticated);

    const pro = await heroService.getHeroesProfileById(1);
    console.log(pro);

    const heroes = await heroService.getHeroes();
    sendSuccess(res, heroes);
  } catch (error) {
    next(error);
  }
};

export const getHeroById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const hero = await heroService.getHeroById(Number(id));
    sendSuccess(res, hero);
  } catch (error) {
    next(error);
  }
};
