"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const AdminMapper_1 = require("./AdminMapper");
class UserMapper {
    static mapFromDatabase(record, prefix = '') {
        var _a, _b;
        return {
            id: +record[`${prefix}id`],
            createdById: +record[`${prefix}created_by`],
            createdBy: record[`${prefix}created_by_name`]
                ? AdminMapper_1.AdminMapper.mapFromDatabase(record, `${prefix}created_by_`)
                : undefined,
            email: record[`${prefix}email`],
            name: record[`${prefix}name`],
            password: record[`${prefix}password`],
            status: record[`${prefix}status`],
            phone: record[`${prefix}phone`],
            createdAt: record[`${prefix}created_at`],
            updatedAt: record[`${prefix}updated_at`],
            deletedAt: (_a = record[`${prefix}deleted_at`]) !== null && _a !== void 0 ? _a : undefined,
            lastLoginAt: (_b = record[`${prefix}last_login_at`]) !== null && _b !== void 0 ? _b : undefined,
        };
    }
    static mapToDatabase(entity) {
        const { createdAt, deletedAt, updatedAt, lastLoginAt } = entity;
        return Object.assign(Object.assign({}, entity), { createdAt: createdAt ? createdAt.toISOString() : null, updatedAt: updatedAt ? updatedAt.toISOString() : null, deletedAt: deletedAt ? deletedAt.toISOString() : null, lastLoginAt: lastLoginAt ? lastLoginAt.toISOString() : null });
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map