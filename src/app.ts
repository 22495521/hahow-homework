import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authMiddleware } from './middleware/auth';
import { heroRoutes } from './routes/heroes';
import { healthRoutes } from './routes/health';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/health', healthRoutes);
app.use(authMiddleware);
app.use('/heroes', heroRoutes);

// 404 處理
app.use(notFoundHandler);

// 統一錯誤處理
app.use(errorHandler);

export default app;