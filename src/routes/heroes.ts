import { Router } from 'express';
import { getHeroes, getHeroById } from '../controllers/heroController';
import { validateId } from '../middleware/validation';

const router = Router();

router.get('/', getHeroes);
router.get('/:id', validateId, getHeroById);

export const heroRoutes = router;
