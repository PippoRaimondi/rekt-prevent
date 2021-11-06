"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const CreateAdminRequestMapper_1 = require("../../../mappers/CreateAdminRequestMapper");
class AdminController {
    constructor(service) {
        this.service = service;
        this.get = this.get.bind(this);
        this.list = this.list.bind(this);
        this.create = this.create.bind(this);
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
            const { users } = await this.service.list();
            return response.json({ users });
        }
        catch (error) {
            next(error);
        }
    }
    async create(request, response, next) {
        try {
            const body = CreateAdminRequestMapper_1.CreateAdminRequestMapper.map(request);
            const user = await this.service.create(body);
            return response.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=AdminController.js.map