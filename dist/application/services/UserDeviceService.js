"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceService = void 0;
const UserDeviceMapper_1 = require("../../domain/mappers/UserDeviceMapper");
class UserDeviceService {
    constructor(createDeviceValidator, repository) {
        this.createDeviceValidator = createDeviceValidator;
        this.repository = repository;
    }
    async list(loggedUser) {
        const devices = await this.repository.findAllByUserId(loggedUser.id);
        return devices.map((device) => UserDeviceMapper_1.UserDeviceMapper.map(device));
    }
    async create(request) {
        this.createDeviceValidator.validate(request);
        const { user, family, token, type } = request;
        const userDevice = {
            userId: user.id,
            token,
            type: type !== null && type !== void 0 ? type : null,
            family,
        };
        await this.repository.create(userDevice);
        return UserDeviceMapper_1.UserDeviceMapper.map(userDevice);
    }
    async delete(token, loggedUser) {
        const userDevice = await this.repository.findByTokenAndUserId(token, loggedUser.id);
        await this.repository.delete(userDevice);
        return UserDeviceMapper_1.UserDeviceMapper.map(userDevice);
    }
}
exports.UserDeviceService = UserDeviceService;
//# sourceMappingURL=UserDeviceService.js.map