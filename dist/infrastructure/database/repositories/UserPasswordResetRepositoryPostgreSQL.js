"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordResetRepositoryPostgreSQL = void 0;
const NotFoundError_1 = require("../../../application/errors/NotFoundError");
const UserPasswordResetMapper_1 = require("./mappers/UserPasswordResetMapper");
class UserPasswordResetRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.TABLE_NAME = 'user_password_resets';
    }
    async create(entity) {
        const query = `
INSERT INTO ${this.TABLE_NAME} (
  token
  , user_id
  , created_at
  , expires_at
  , verified_at
)
VALUES (
  \${token}
  , \${userId}
  , \${createdAt}
  , \${expiresAt}
  , \${verifiedAt}
)`;
        const result = await this.db.result(query, UserPasswordResetMapper_1.UserPasswordResetMapper.mapToDatabase(entity));
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
        const result = await this.db.result(query, UserPasswordResetMapper_1.UserPasswordResetMapper.mapToDatabase(entity));
        return result.rowCount > 0;
    }
    async findByToken(token) {
        const query = `
SELECT
  password_resets.token
  , password_resets.user_id
  , password_resets.created_at
  , password_resets.expires_at
  , password_resets.verified_at
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
  ${this.TABLE_NAME} password_resets
JOIN
  users u ON u.id = password_resets.user_id
WHERE
  password_resets.token = \${token}
    `;
        const record = await this.db.oneOrNone(query, { token });
        if (!record) {
            throw new NotFoundError_1.NotFoundError();
        }
        return UserPasswordResetMapper_1.UserPasswordResetMapper.mapFromDatabase(record);
    }
}
exports.UserPasswordResetRepositoryPostgreSQL = UserPasswordResetRepositoryPostgreSQL;
//# sourceMappingURL=UserPasswordResetRepositoryPostgreSQL.js.map