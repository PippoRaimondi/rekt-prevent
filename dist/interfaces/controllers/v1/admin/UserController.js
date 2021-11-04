"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const CreateUserRequestMapper_1 = require("../../../mappers/CreateUserRequestMapper");
const ListUserRequestMapper_1 = require("../../../mappers/ListUserRequestMapper");
class UserController {
    constructor(service) {
        this.service = service;
        this.get = this.get.bind(this);
        this.list = this.list.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.resendInvite = this.resendInvite.bind(this);
    }
    async get(request, response, next) {
        try {
            const user = await this.service.get(+request.params.id);
            return response.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async list(request, response, next) {
        try {
            const body = ListUserRequestMapper_1.ListUserRequestMapper.map(request);
            const { pagination, users } = await this.service.list(body);
            return response.json({ pagination, users });
        }
        catch (error) {
            next(error);
        }
    }
    async create(request, response, next) {
        try {
            const body = CreateUserRequestMapper_1.CreateUserRequestMapper.map(request);
            const user = await this.service.create(body);
            return response.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(request, response, next) {
        try {
            const id = +request.params.id;
            const user = await this.service.delete(id);
            return response.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async resendInvite(request, response, next) {
        try {
            const id = +request.params.id;
            const userVerification = this.service.resendInvite(id);
            return response.status(200).json(userVerification);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map