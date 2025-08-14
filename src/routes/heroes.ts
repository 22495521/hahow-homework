import { Router } from 'express';
import { getHeroes, getHeroById } from '../controllers/heroController';
import { validateId } from '../middleware/validation';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getHeroes);
router.get('/:id', validateId, getHeroById);

export const heroRoutes = router;
