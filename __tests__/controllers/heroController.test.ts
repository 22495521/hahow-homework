import request from 'supertest';
import app from '../../src/app';
import { heroService } from '../../src/services/heroService';
import { authMiddleware } from '../../src/middleware/auth';

jest.mock('../../src/services/heroService');
jest.mock('../../src/middleware/auth');

const mockedHeroService = heroService as jest.Mocked<typeof heroService>;
const mockedAuthMiddleware = authMiddleware as jest.MockedFunction<
  typeof authMiddleware
>;

describe('Hero Controller', () => {
  describe('GET /heroes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('when user is not authenticated', () => {
      it('should call getHeroesNoProfile and return basic hero data', async () => {
        const mockHeroes = [
          { id: '1', name: 'Hero 1', image: 'hero1.jpg' },
          { id: '2', name: 'Hero 2', image: 'hero2.jpg' },
        ];

        mockedAuthMiddleware.mockImplementation(async (req: any, res, next) => {
          req.isAuthenticated = false;
          next();
        });

        mockedHeroService.getHeroesNoProfile.mockResolvedValue(mockHeroes);

        const response = await request(app).get('/heroes').expect(200);

        expect(response.body).toEqual({
          success: true,
          data: mockHeroes,
        });
        expect(mockedHeroService.getHeroesNoProfile).toHaveBeenCalledTimes(1);
        expect(mockedHeroService.getHeroesWithProfile).not.toHaveBeenCalled();
      });

      it('should handle service errors when not authenticated', async () => {
        const errorMessage = 'Service unavailable';

        mockedAuthMiddleware.mockImplementation(async (req: any, res, next) => {
          req.isAuthenticated = false;
          next();
        });

        mockedHeroService.getHeroesNoProfile.mockRejectedValue(
          new Error(errorMessage),
        );

        const response = await request(app).get('/heroes').expect(500);

        expect(response.body).toEqual({
          success: false,
          error: expect.any(String),
        });
        expect(mockedHeroService.getHeroesNoProfile).toHaveBeenCalledTimes(1);
        expect(mockedHeroService.getHeroesWithProfile).not.toHaveBeenCalled();
      });
    });

    describe('when user is authenticated', () => {
      it('should call getHeroesWithProfile and return hero data with profile', async () => {
        const mockHeroesWithProfile = [
          {
            id: '1',
            name: 'Hero 1',
            image: 'hero1.jpg',
            profile: { str: 10, int: 8, agi: 12, luk: 6 },
          },
          {
            id: '2',
            name: 'Hero 2',
            image: 'hero2.jpg',
            profile: { str: 15, int: 5, agi: 8, luk: 10 },
          },
        ];

        mockedAuthMiddleware.mockImplementation(async (req: any, res, next) => {
          req.isAuthenticated = true;
          next();
        });

        mockedHeroService.getHeroesWithProfile.mockResolvedValue(
          mockHeroesWithProfile,
        );

        const response = await request(app)
          .get('/heroes')
          .set('Name', 'hahow')
          .set('Password', 'rocks')
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          data: mockHeroesWithProfile,
        });
        expect(mockedHeroService.getHeroesWithProfile).toHaveBeenCalledTimes(1);
        expect(mockedHeroService.getHeroesNoProfile).not.toHaveBeenCalled();
      });

      it('should handle service errors when authenticated', async () => {
        const errorMessage = 'Service unavailable';

        mockedAuthMiddleware.mockImplementation(async (req: any, res, next) => {
          req.isAuthenticated = true;
          next();
        });

        mockedHeroService.getHeroesWithProfile.mockRejectedValue(
          new Error(errorMessage),
        );

        const response = await request(app)
          .get('/heroes')
          .set('Name', 'hahow')
          .set('Password', 'rocks')
          .expect(500);

        expect(response.body).toEqual({
          success: false,
          error: expect.any(String),
        });
        expect(mockedHeroService.getHeroesWithProfile).toHaveBeenCalledTimes(1);
        expect(mockedHeroService.getHeroesNoProfile).not.toHaveBeenCalled();
      });
    });
  });

  describe('GET /heroes/:id', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return single hero data successfully', async () => {
      const mockHero = {
        id: '1',
        name: 'Hero 1',
        image: 'hero1.jpg',
      };

      mockedHeroService.getHeroById.mockResolvedValue(mockHero);

      const response = await request(app).get('/heroes/1').expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockHero,
      });
      expect(mockedHeroService.getHeroById).toHaveBeenCalledTimes(1);
      expect(mockedHeroService.getHeroById).toHaveBeenCalledWith(1);
    });

    //for joi
    it('should handle invalid hero ID format', async () => {
      const response = await request(app).get('/heroes/invalid').expect(400);

      expect(response.body).toEqual({
        error: 'Validation failed',
        message: 'ID must be a number',
      });
    });

    it('should handle non-existent hero ID', async () => {
      const axiosError = {
        response: { status: 404 },
        isAxiosError: true,
      };
      mockedHeroService.getHeroById.mockRejectedValue(axiosError);

      const response = await request(app).get('/heroes/999').expect(404);

      expect(response.body).toEqual({
        success: false,
        error: expect.any(String),
      });
      expect(mockedHeroService.getHeroById).toHaveBeenCalledTimes(1);
      expect(mockedHeroService.getHeroById).toHaveBeenCalledWith(999);
    });

    it('should handle service errors', async () => {
      const errorMessage = 'Service unavailable';
      mockedHeroService.getHeroById.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/heroes/1').expect(500);

      expect(response.body).toEqual({
        success: false,
        error: expect.any(String),
      });
      expect(mockedHeroService.getHeroById).toHaveBeenCalledTimes(1);
    });

    it('should call heroService.getHeroById with correct parameters', async () => {
      const mockHero = { id: '2', name: 'Hero 2', image: 'hero2.jpg' };
      mockedHeroService.getHeroById.mockResolvedValue(mockHero);

      await request(app).get('/heroes/2').expect(200);

      expect(mockedHeroService.getHeroById).toHaveBeenCalledWith(2);
    });
  });
});
