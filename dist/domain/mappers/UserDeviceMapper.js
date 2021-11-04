"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceMapper = void 0;
class UserDeviceMapper {
    static map(entity) {
        const { family, token, type, createdAt } = entity;
        return {
            family,
            type,
            token,
            createdAt,
        };
    }
}
exports.UserDeviceMapper = UserDeviceMapper;
//# sourceMappingURL=UserDeviceMapper.js.map