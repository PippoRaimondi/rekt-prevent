import { UserWithRelations } from '../interfaces/User';

export interface UserAggregatorRepository {
  findById(id: number): Promise<UserWithRelations>;
}
