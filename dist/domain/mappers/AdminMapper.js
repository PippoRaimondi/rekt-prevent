"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMapper = void 0;
class AdminMapper {
    static toJSON(entity) {
        return this.map(entity);
    }
    static map(entity) {
        const { name, email } = entity;
        return {
            id: entity.id,
            name,
            email,
        };
    }
}
exports.AdminMapper = AdminMapper;
//# sourceMappingURL=AdminMapper.js.map