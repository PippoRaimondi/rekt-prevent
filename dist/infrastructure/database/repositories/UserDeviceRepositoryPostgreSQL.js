"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceRepositoryPostgreSQL = void 0;
const NotFoundError_1 = require("../../../application/errors/NotFoundError");
const UserDeviceMapper_1 = require("./mappers/UserDeviceMapper");
class UserDeviceRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.TABLE_NAME = 'user_devices';
    }
    async create(entity) {
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
        const result = await this.db.result(query, UserDeviceMapper_1.UserDeviceMapper.mapToDatabase(entity));
        return result.rowCount > 0;
    }
    async delete(entity) {
        const query = `
DELETE FROM
  ${this.TABLE_NAME}
WHERE
  device_token = \${token}
  AND user_id = \${userId}
`;
        const result = await this.db.result(query, UserDeviceMapper_1.UserDeviceMapper.mapToDatabase(entity));
        return result.rowCount > 0;
    }
    async findAllByUserId(userId) {
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
        return records.map((record) => UserDeviceMapper_1.UserDeviceMapper.mapFromDatabase(record));
    }
    async findByTokenAndUserId(token, userId) {
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
            throw new NotFoundError_1.NotFoundError();
        }
        return UserDeviceMapper_1.UserDeviceMapper.mapFromDatabase(record);
    }
}
exports.UserDeviceRepositoryPostgreSQL = UserDeviceRepositoryPostgreSQL;
//# sourceMappingURL=UserDeviceRepositoryPostgreSQL.js.map