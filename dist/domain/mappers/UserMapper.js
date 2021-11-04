"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const AdminMapper_1 = require("./AdminMapper");
const UserDeviceMapper_1 = require("./UserDeviceMapper");
class UserMapper {
    static toJSON(entity) {
        return this.map(entity);
    }
    static map(entity) {
        const { createdAt, createdBy, devices, email, id, name, phone, status, updatedAt, role, lastLoginAt, } = entity;
        return {
            id: +id,
            name,
            status,
            phone,
            email,
            createdAt: createdAt,
            updatedAt: updatedAt,
            createdBy: createdBy ? AdminMapper_1.AdminMapper.map(createdBy) : null,
            devices: this.mapDevices(devices),
            role,
            lastLoginAt,
        };
    }
    static mapDevices(devices) {
        if (!devices) {
            return [];
        }
        return devices.map((device) => UserDeviceMapper_1.UserDeviceMapper.map(device));
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map