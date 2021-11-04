"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPasswordResetMapper = void 0;
const AdminMapper_1 = require("./AdminMapper");
class AdminPasswordResetMapper {
    static mapFromDatabase(record) {
        var _a;
        return {
            token: record['token'],
            adminId: +record['admin_id'],
            createdAt: record['created_at'],
            expiresAt: record['expires_at'],
            verifiedAt: (_a = record['verified_at']) !== null && _a !== void 0 ? _a : null,
            admin: AdminMapper_1.AdminMapper.mapFromDatabase(record, 'admin_'),
        };
    }
    static mapToDatabase(entity) {
        const { createdAt, expiresAt, verifiedAt } = entity;
        return Object.assign(Object.assign({}, entity), { createdAt: createdAt ? createdAt.toISOString() : null, expiresAt: expiresAt.toISOString(), verifiedAt: verifiedAt ? verifiedAt.toISOString() : null });
    }
}
exports.AdminPasswordResetMapper = AdminPasswordResetMapper;
//# sourceMappingURL=AdminPasswordResetMapper.js.map