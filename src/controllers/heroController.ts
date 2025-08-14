import { Request, Response, NextFunction } from 'express';
import { heroService } from '../services/heroService';
import { sendSuccess, sendError } from '../utils/response';

export const getHeroes = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const isAuth = req.isAuthenticated;

    console.log(isAuth);

    if (isAuth) {
      const heroes = await heroService.getHeroesHaveProfile();
      sendSuccess(res, heroes);
    }

    if (!isAuth) {
      const heroes = await heroService.getHeroesNoProfile();
      sendSuccess(res, heroes);
    }
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
