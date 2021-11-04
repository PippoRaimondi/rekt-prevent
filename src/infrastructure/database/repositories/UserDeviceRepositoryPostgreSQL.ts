import { IMain } from 'pg-promise';

import { NotFoundError } from '../../../application/errors/NotFoundError';
import { UserDeviceRepository } from '../../../application/repositories/UserDeviceRepository';
import { UserDevice } from '../../../domain/entities/UserDevice';
import { IDatabaseExtended } from '../RepositoryFactory';
import { UserDeviceMapper } from './mappers/UserDeviceMapper';

export class UserDeviceRepositoryPostgreSQL implements UserDeviceRepository {
  private readonly TABLE_NAME = 'user_devices';

  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  async create(entity: UserDevice): Promise<boolean> {
    const query = `
INSERT INTO ${this.TABLE_NAME} (
  user_id
  , device_type
  , device_token
  , device_family
)
VALUES (
  \${userId}
  , \${type}
  , \${token}
  , \${family}
)
`;
    const result = await this.db.result(query, UserDeviceMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }

  async delete(entity: UserDevice): Promise<boolean> {
    const query = `
DELETE FROM
  ${this.TABLE_NAME}
WHERE
  device_token = \${token}
  AND user_id = \${userId}
`;

    const result = await this.db.result(query, UserDeviceMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }

  async findAllByUserId(userId: number): Promise<UserDevice[]> {
    const query = `
SELECT
  d.user_id
  , d.device_token
  , d.device_type
  , d.device_family
  , d.created_at
FROM
  ${this.TABLE_NAME} d
WHERE
  d.user_id = \${userId}
    `;

    const records = await this.db.manyOrNone(query, { userId });
    if (!records) {
      return [];
    }

    return records.map((record) => UserDeviceMapper.mapFromDatabase(record));
  }

  async findByTokenAndUserId(token: string, userId: number): Promise<UserDevice> {
    const query = `
SELECT
  d.user_id
  , d.device_token
  , d.device_type
  , d.device_family
  , d.created_at
FROM
  ${this.TABLE_NAME} d
WHERE
  d.user_id = \${userId}
  AND d.device_token = \${token}
    `;

    const record = await this.db.oneOrNone(query, { token, userId });
    if (!record) {
      throw new NotFoundError();
    }

    return UserDeviceMapper.mapFromDatabase(record);
  }
}
