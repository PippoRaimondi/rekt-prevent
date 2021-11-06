"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMapper = void 0;
class AdminMapper {
    static mapFromDatabase(record, prefix = '') {
        return {
            id: +record[`${prefix}id`],
            name: record[`${prefix}name`],
            email: record[`${prefix}email`],
            password: record[`${prefix}password`],
        };
    }
    static mapToDatabase(entity) {
        const { name, email, password } = entity;
        return {
            name,
            email,
            password,
        };
    }
}
exports.AdminMapper = AdminMapper;
//# sourceMappingURL=AdminMapper.js.map