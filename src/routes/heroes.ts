import { Router } from 'express';
import { getHeroes, getHeroById } from '../controllers/heroController';

const router = Router();

router.get('/', getHeroes);
router.get('/:heroId', getHeroById);

export const heroRoutes = router;