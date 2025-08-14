import axios from 'axios';
import { Request } from 'express';

class HeroService {
  async getHeroes(): Promise<any> {
    try {
      // Fetch all heroes
      const response = await axios.get(`${process.env.HAHOW_API_URL}/heroes`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getHeroById(heroId: number): Promise<any> {
    try {
      // Fetch hero by ID
      const response = await axios.get(
        `${process.env.HAHOW_API_URL}/heroes/${heroId}`,
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getHeroesProfileById(id: Number): Promise<any> {
    try {
      const url = `${process.env.HAHOW_API_URL}/heroes/${id}/profile`;
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const heroService = new HeroService();
