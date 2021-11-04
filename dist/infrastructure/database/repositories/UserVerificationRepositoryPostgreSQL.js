"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerificationRepositoryPostgreSQL = void 0;
const NotFoundError_1 = require("../../../application/errors/NotFoundError");
const UserVerificationMapper_1 = require("./mappers/UserVerificationMapper");
class UserVerificationRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.TABLE_NAME = 'user_verifications';
    }
    async create(entity) {
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
        const result = await this.db.result(query, UserVerificationMapper_1.UserVerificationMapper.mapToDatabase(entity));
        return result.rowCount > 0;
    }
    async updateVerifiedAt(entity) {
        const query = `
UPDATE
  ${this.TABLE_NAME}
SET
  verified_at = \${verifiedAt}
WHERE
  token = \${token}
  AND verified_at IS NULL
`;
        const result = await this.db.result(query, UserVerificationMapper_1.UserVerificationMapper.mapToDatabase(entity));
        return result.rowCount > 0;
    }
    async findByToken(token) {
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
            throw new NotFoundError_1.NotFoundError();
        }
        return UserVerificationMapper_1.UserVerificationMapper.mapFromDatabase(record);
    }
}
exports.UserVerificationRepositoryPostgreSQL = UserVerificationRepositoryPostgreSQL;
//# sourceMappingURL=UserVerificationRepositoryPostgreSQL.js.map