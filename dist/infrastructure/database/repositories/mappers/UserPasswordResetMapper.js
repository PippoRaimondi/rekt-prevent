"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordResetMapper = void 0;
const UserMapper_1 = require("./UserMapper");
class UserPasswordResetMapper {
    static mapFromDatabase(record) {
        var _a;
        return {
            token: record['token'],
            userId: +record['user_id'],
            createdAt: record['created_at'],
            expiresAt: record['expires_at'],
            verifiedAt: (_a = record['verified_at']) !== null && _a !== void 0 ? _a : null,
            user: UserMapper_1.UserMapper.mapFromDatabase(record, 'user_'),
        };
    }
    static mapToDatabase(entity) {
        const { createdAt, expiresAt, verifiedAt } = entity;
        return Object.assign(Object.assign({}, entity), { createdAt: createdAt ? createdAt.toISOString() : null, expiresAt: expiresAt.toISOString(), verifiedAt: verifiedAt ? verifiedAt.toISOString() : null });
    }
}
exports.UserPasswordResetMapper = UserPasswordResetMapper;
//# sourceMappingURL=UserPasswordResetMapper.js.map