import { Portfolio } from '../../domain/entities/Portfolio';
import { PortfolioFilter, NewPortfolio } from '../interfaces/Portfolio';

export interface PortfolioRepository {
  create(holiday: NewPortfolio): Promise<Portfolio>;

  delete(holiday: Portfolio): Promise<boolean>;

  findById(id: number): Promise<Portfolio>;
  findAll(filter: PortfolioFilter, limit: number, offset: number): Promise<[Portfolio[], number]>;
}
