import axios from 'axios';
import { Request } from 'express';

class HeroService {
  async getHeroesNoProfile(): Promise<any> {
    try {
      // Fetch all heroes without profile
      const response = await axios.get(`${process.env.HAHOW_API_URL}/heroes`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getHeroesWithProfile(): Promise<any> {
    try {
      const heroList = await this.getHeroesNoProfile();

      // Fetch profile for each hero
      const heroesWithProfile = await Promise.all(
        heroList.map(async (hero: any) => {
          const profile = await this.getHeroesProfileById(hero.id);
          return { ...hero, profile };
        }),
      );

      return heroesWithProfile;
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
