class HeroService {
  async getHeroes(): Promise<any> {
    return 'getHeroes message';
  }

  async getHeroById(): Promise<any> {
    return 'getHeroById message';
  }
}

export const heroService = new HeroService();
