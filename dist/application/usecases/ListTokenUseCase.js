"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTokenUseCase = void 0;
class ListTokenUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async invoke(filter, limit, offset) {
        const tokens = await this.repository.findAll(filter, limit, offset);
        return tokens;
    }
}
exports.ListTokenUseCase = ListTokenUseCase;
//# sourceMappingURL=ListTokenUseCase.js.map