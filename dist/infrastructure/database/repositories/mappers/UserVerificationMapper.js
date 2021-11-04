"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerificationMapper = void 0;
const UserMapper_1 = require("./UserMapper");
class UserVerificationMapper {
    static mapFromDatabase(record) {
        var _a;
        return {
            token: record['token'],
            userId: +record['user_id'],
            createdAt: record['created_at'],
            updatedAt: record['updated_at'],
            verifiedAt: (_a = record['verified_at']) !== null && _a !== void 0 ? _a : null,
            user: UserMapper_1.UserMapper.mapFromDatabase(record, 'user_'),
        };
    }
    static mapToDatabase(entity) {
        const { createdAt, updatedAt, verifiedAt } = entity;
        return Object.assign(Object.assign({}, entity), { createdAt: createdAt ? createdAt.toISOString() : null, updatedAt: updatedAt ? updatedAt.toISOString() : null, verifiedAt: verifiedAt ? verifiedAt.toISOString() : null });
    }
}
exports.UserVerificationMapper = UserVerificationMapper;
//# sourceMappingURL=UserVerificationMapper.js.map