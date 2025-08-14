import axios from 'axios';

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

      // Process heroes in chunks
      const CHUNK_SIZE = 5;
      const heroesWithProfile = [];

      for (let i = 0; i < heroList.length; i += CHUNK_SIZE) {
        const chunk = heroList.slice(i, i + CHUNK_SIZE);

        const chunkResults = await Promise.all(
          chunk.map(async (hero: any) => {
            try {
              const profile = await this.getHeroesProfileById(hero.id);
              return { ...hero, profile };
            } catch (error) {
              console.warn(
                `Failed to fetch profile for hero ${hero.id}:`,
                error,
              );
              return hero;
            }
          }),
        );

        heroesWithProfile.push(...chunkResults);
      }

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

  async getHeroByIdWithProfile(heroId: number): Promise<any> {
    try {
      // Fetch hero by ID
      const heroResponse = await axios.get(
        `${process.env.HAHOW_API_URL}/heroes/${heroId}`,
      );
      const hero: any = heroResponse.data;

      // Fetch hero profile
      try {
        const profile = await this.getHeroesProfileById(heroId);
        return { ...hero, profile };
      } catch (profileError) {
        console.warn(
          `Failed to fetch profile for hero ${heroId}:`,
          profileError,
        );
        return hero;
      }
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
