"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTokenUseCase = void 0;
const PaginationUtils_1 = require("../../application/utils/PaginationUtils");
const TokenMapper_1 = require("../../domain/mappers/TokenMapper");
const PaginationMapper_1 = require("../../domain/mappers/PaginationMapper");
class ListTokenUseCase {
    constructor(repository) {
        this.repository = repository;
        this.TOKENS_PER_PAGE = 20;
    }
    async invoke(request) {
        const { page, filter } = request;
        const offset = PaginationUtils_1.PaginationUtils.getOffsetByPage(page, this.TOKENS_PER_PAGE);
        const [tokens, count] = await this.repository.findAll(filter, this.TOKENS_PER_PAGE, offset);
        return {
            tokens: tokens.map((token) => TokenMapper_1.TokenMapper.map(token)),
            pagination: PaginationMapper_1.PaginationMapper.map(page, count, this.TOKENS_PER_PAGE),
        };
    }
}
exports.ListTokenUseCase = ListTokenUseCase;
//# sourceMappingURL=ListTokenUseCase.js.map