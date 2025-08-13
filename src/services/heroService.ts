import axios from 'axios';
import { AxiosError } from '../errors/AxiosError';
import { ServiceError } from '../errors/ServiceError';

class HeroService {
  async getHeroes(): Promise<any> {
    try {
      const response = await axios.get(`${process.env.HAHOW_API_URL}/heroes`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const heroService = new HeroService();
