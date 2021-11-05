"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTokenUseCase = void 0;
class UpdateTokenUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async invoke(id, request) {
        const { description, chain, price } = request;
        const status = await this.repository.update(id, {
            description,
            chain,
            price,
        });
        return status;
    }
}
exports.UpdateTokenUseCase = UpdateTokenUseCase;
//# sourceMappingURL=UpdateTokenUseCase.js.map