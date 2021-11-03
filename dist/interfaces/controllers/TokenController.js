"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
class TokenController {
    constructor(listUseCase) {
        this.listUseCase = listUseCase;
        this.list = this.list.bind(this);
    }
    async list(request, response, next) {
        try {
            const tokens = await this.listUseCase.invoke(request.body, 100, 0);
            return response.json(tokens);
        }
        catch (error) {
            console.error(`Error on list tokens:`, error);
            next(error);
        }
    }
}
exports.TokenController = TokenController;
//# sourceMappingURL=TokenController.js.map