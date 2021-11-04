import { IMain } from 'pg-promise';

import { UserWithRelations } from '../../../application/interfaces/User';
import { UserAggregatorRepository } from '../../../application/repositories/UserAggregatorRepository';
import { IDatabaseExtended } from '../RepositoryFactory';

export class UserAggregatorRepositoryPostgreSQL implements UserAggregatorRepository {
  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  async findById(id: number): Promise<UserWithRelations> {
    const [user, devices] = await this.db.task((t) => {
      return Promise.all([
        t.user.findById(id),
        t.userDevice.findAllByUserId(id),
      ]);
    });

    return {
      ...user,
      devices,
    };
  }
}
