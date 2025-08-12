import { ServiceError } from './ServiceError';

export class HeroNotFoundError extends ServiceError {
  constructor(heroId: string) {
    super(`英雄 ${heroId} 不存在`, 404, 'HERO_NOT_FOUND');
    this.name = 'HeroNotFoundError';
  }
}