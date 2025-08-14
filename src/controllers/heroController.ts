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

    if (isAuth) {
      const heroes = await heroService.getHeroesWithProfile();
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

    const isAuth = req.isAuthenticated;

    if (isAuth) {
      const heroes = await heroService.getHeroByIdWithProfile(Number(id));
      sendSuccess(res, heroes);
    }

    if (!isAuth) {
      const hero = await heroService.getHeroById(Number(id));
      sendSuccess(res, hero);
    }
  } catch (error) {
    next(error);
  }
};
