"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceMapper = void 0;
class UserDeviceMapper {
    static mapFromDatabase(record) {
        return {
            userId: +record['user_id'],
            token: record['device_token'],
            type: record['device_type'],
            family: record['device_family'],
            createdAt: record['created_at'],
        };
    }
    static mapToDatabase(entity) {
        const { createdAt } = entity;
        return Object.assign(Object.assign({}, entity), { createdAt: createdAt ? createdAt.toISOString() : null });
    }
}
exports.UserDeviceMapper = UserDeviceMapper;
//# sourceMappingURL=UserDeviceMapper.js.map