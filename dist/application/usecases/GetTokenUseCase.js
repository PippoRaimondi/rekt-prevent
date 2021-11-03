"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTokenUseCase = void 0;
const TokenMapper_1 = require("../../domain/mappers/TokenMapper");
class GetTokenUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async invoke(id) {
        const token = await this.repository.findById(id);
        return TokenMapper_1.TokenMapper.toJSON(token);
    }
}
exports.GetTokenUseCase = GetTokenUseCase;
//# sourceMappingURL=GetTokenUseCase.js.map