"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTokenUseCase = void 0;
class DeleteTokenUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async invoke(id) {
        const status = await this.repository.delete(id);
        return status;
    }
}
exports.DeleteTokenUseCase = DeleteTokenUseCase;
//# sourceMappingURL=DeleteTokenUseCase.js.map