import request from 'supertest';
import app from '../../src/app';
import { heroService } from '../../src/services/heroService';

jest.mock('../../src/services/heroService');

const mockedHeroService = heroService as jest.Mocked<typeof heroService>;

describe('Hero Controller', () => {
  describe('GET /heroes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return heroes data successfully', async () => {
      const mockHeroes = [
        { id: '1', name: 'Hero 1', image: 'hero1.jpg' },
        { id: '2', name: 'Hero 2', image: 'hero2.jpg' },
      ];

      mockedHeroService.getHeroes.mockResolvedValue(mockHeroes);

      const response = await request(app).get('/heroes').expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockHeroes,
      });
      expect(mockedHeroService.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      const errorMessage = 'Service unavailable';
      mockedHeroService.getHeroes.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/heroes').expect(500);

      expect(response.body).toEqual({
        success: false,
        error: expect.any(String),
      });
      expect(mockedHeroService.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should call heroService.getHeroes', async () => {
      const mockHeroes: any[] = [];
      mockedHeroService.getHeroes.mockResolvedValue(mockHeroes);

      await request(app).get('/heroes').expect(200);

      expect(mockedHeroService.getHeroes).toHaveBeenCalled();
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
        isAxiosError: true
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
