"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDeviceRequestMapper = void 0;
class CreateUserDeviceRequestMapper {
    static map(request) {
        const { type, token, family } = request.body;
        return {
            type,
            token,
            family,
            user: request.user,
        };
    }
}
exports.CreateUserDeviceRequestMapper = CreateUserDeviceRequestMapper;
//# sourceMappingURL=CreateUserDeviceRequestMapper.js.map