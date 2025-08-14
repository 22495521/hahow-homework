import request from 'supertest';
import express from 'express';
import {
  authMiddleware,
  AuthenticatedRequest,
} from '../../src/middleware/auth';

process.env.HAHOW_API_URL = 'https://hahow-recruit.herokuapp.com';

const app = express();
app.use(express.json());
app.use(authMiddleware);

// 測試路由來檢驗驗證狀態
app.get('/test-auth', (req: AuthenticatedRequest, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated,
  });
});

describe('Auth Middleware - Real Tests', () => {
  it('should set isAuthenticated to true when correct credentials are provided', async () => {
    const response = await request(app)
      .get('/test-auth')
      .set('Name', 'hahow')
      .set('Password', 'rocks')
      .expect(200);

    expect(response.body.isAuthenticated).toBe(true);
  });

  it('should set isAuthenticated to false when incorrect credentials are provided', async () => {
    const response = await request(app)
      .get('/test-auth')
      .set('Name', 'wrong')
      .set('Password', 'wrong')
      .expect(200);

    expect(response.body.isAuthenticated).toBe(false);
  });
});
