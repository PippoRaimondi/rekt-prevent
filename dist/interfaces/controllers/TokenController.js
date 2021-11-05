"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const ListTokenRequestMapper_1 = require("../mappers/ListTokenRequestMapper");
const CreateTokenRequestMapper_1 = require("../mappers/CreateTokenRequestMapper");
const UpdateTokenRequestMapper_1 = require("../mappers/UpdateTokenRequestMapper");
class TokenController {
    constructor(listUseCase, createUseCase, deleteUseCase, getUseCase, updateUseCase) {
        this.listUseCase = listUseCase;
        this.createUseCase = createUseCase;
        this.deleteUseCase = deleteUseCase;
        this.getUseCase = getUseCase;
        this.updateUseCase = updateUseCase;
        this.list = this.list.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
    }
    async list(request, response, next) {
        try {
            const body = ListTokenRequestMapper_1.ListTokenRequestMapper.map(request);
            const tokens = await this.listUseCase.invoke(body);
            return response.json(tokens);
        }
        catch (error) {
            console.error(`Error on list tokens:`, error);
            next(error);
        }
    }
    async get(request, response, next) {
        try {
            const id = parseInt(request.params.id);
            const token = await this.getUseCase.invoke(id);
            return response.json(token);
        }
        catch (error) {
            console.error(`Error on list tokens:`, error);
            next(error);
        }
    }
    async create(request, response, next) {
        try {
            const body = CreateTokenRequestMapper_1.CreateTokenRequestMapper.map(request);
            const token = await this.createUseCase.invoke(body);
            return response.json(token);
        }
        catch (error) {
            console.error(`Error on list tokens:`, error);
            next(error);
        }
    }
    async update(request, response, next) {
        try {
            const id = parseInt(request.params.id);
            const body = UpdateTokenRequestMapper_1.UpdateTokenRequestMapper.map(request);
            const token = await this.updateUseCase.invoke(id, body);
            return response.json(token);
        }
        catch (error) {
            console.error(`Error on update tokens:`, error);
            next(error);
        }
    }
    async delete(request, response, next) {
        try {
            const id = parseInt(request.params.id);
            const token = await this.deleteUseCase.invoke(id);
            return response.json(token);
        }
        catch (error) {
            console.error(`Error on list tokens:`, error);
            next(error);
        }
    }
}
exports.TokenController = TokenController;
//# sourceMappingURL=TokenController.js.map