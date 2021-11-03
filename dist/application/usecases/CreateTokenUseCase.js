"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTokenUseCase = void 0;
const TokenMapper_1 = require("../../domain/mappers/TokenMapper");
class CreateTokenUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async invoke(request) {
        const { description, chain, price } = request;
        const token = await this.repository.create({
            description,
            chain,
            price,
        });
        return TokenMapper_1.TokenMapper.toJSON(token);
    }
}
exports.CreateTokenUseCase = CreateTokenUseCase;
//# sourceMappingURL=CreateTokenUseCase.js.map