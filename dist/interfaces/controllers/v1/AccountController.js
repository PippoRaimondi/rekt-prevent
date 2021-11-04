"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const CreateUserDeviceRequestMapper_1 = require("../../mappers/CreateUserDeviceRequestMapper");
const ResetPasswordRequestMapper_1 = require("../../mappers/ResetPasswordRequestMapper");
const UpdateUserRequestMapper_1 = require("../../mappers/UpdateUserRequestMapper");
class AccountController {
    constructor(userService, userDeviceService) {
        this.userService = userService;
        this.userDeviceService = userDeviceService;
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
        this.welcome = this.welcome.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.getAllDevices = this.getAllDevices.bind(this);
        this.createDevice = this.createDevice.bind(this);
        this.deleteDevice = this.deleteDevice.bind(this);
    }
    async get(request, response, next) {
        try {
            const loggedUser = request.user;
            const user = await this.userService.get(loggedUser.id);
            return response.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async welcome(request, response) {
        try {
            const { token } = request.params;
            const userWithToken = await this.userService.validateWelcomeToken(token);
            return response.json(userWithToken);
        }
        catch (error) {
            return response.status(404).end();
        }
    }
    async resetPassword(request, response, next) {
        try {
            const body = ResetPasswordRequestMapper_1.ResetPasswordRequestMapper.map(request);
            await this.userService.resetPassword(body);
            return response.status(200).end();
        }
        catch (error) {
            next(error);
        }
    }
    async update(request, response, next) {
        try {
            const body = UpdateUserRequestMapper_1.UpdateUserRequestMapper.map(request);
            const user = await this.userService.update(body);
            return response.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllDevices(request, response, next) {
        try {
            const devices = await this.userDeviceService.list(request.user);
            return response.status(200).json(devices);
        }
        catch (error) {
            next(error);
        }
    }
    async createDevice(request, response, next) {
        try {
            const body = CreateUserDeviceRequestMapper_1.CreateUserDeviceRequestMapper.map(request);
            const device = await this.userDeviceService.create(body);
            return response.status(201).json(device);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteDevice(request, response, next) {
        try {
            const { token } = request.params;
            const device = await this.userDeviceService.delete(token, request.user);
            return response.status(200).json(device);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=AccountController.js.map