import { IMain } from 'pg-promise';

import { NotFoundError } from '../../../application/errors/NotFoundError';
import { UserVerificationWithRelations } from '../../../application/interfaces/UserVerification';
import { UserVerificationRepository } from '../../../application/repositories/UserVerificationRepository';
import { UserVerification } from '../../../domain/entities/UserVerification';
import { IDatabaseExtended } from '../RepositoryFactory';
import { UserVerificationMapper } from './mappers/UserVerificationMapper';

export class UserVerificationRepositoryPostgreSQL implements UserVerificationRepository {
  private readonly TABLE_NAME = 'user_verifications';

  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  async create(entity: UserVerification): Promise<boolean> {
    const query = `
INSERT INTO ${this.TABLE_NAME} (
  token
  , user_id
  , created_at
  , verified_at
)
VALUES (
  \${token}
  , \${userId}
  , \${createdAt}
  , \${verifiedAt}
)`;

    const result = await this.db.result(query, UserVerificationMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }

  async updateVerifiedAt(entity: UserVerification): Promise<boolean> {
    const query = `
UPDATE
  ${this.TABLE_NAME}
SET
  verified_at = \${verifiedAt}
WHERE
  token = \${token}
  AND verified_at IS NULL
`;

    const result = await this.db.result(query, UserVerificationMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }

  async findByToken(token: string): Promise<UserVerificationWithRelations> {
    const query = `
SELECT
  uv.token
  , uv.user_id
  , uv.created_at
  , uv.updated_at
  , uv.verified_at
  , u.name AS "user_name"
  , u.status AS "user_status"
  , u.phone AS "user_phone"
  , u.created_by AS "user_created_by"
  , u.email AS "user_email"
  , u.password AS "user_password"
  , u.created_at AS "user_created_at"
  , u.updated_at AS "user_updated_at"
  , u.deleted_at AS "user_deleted_at"
FROM
  ${this.TABLE_NAME} uv
JOIN
  users u ON u.id = uv.user_id
WHERE
  uv.token = \${token}
    `;

    const record = await this.db.oneOrNone(query, { token });
    if (!record) {
      throw new NotFoundError();
    }

    return UserVerificationMapper.mapFromDatabase(record);
  }
}
