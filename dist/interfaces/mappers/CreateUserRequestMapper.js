"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRequestMapper = void 0;
class CreateUserRequestMapper {
    static map(request) {
        const { name, email, phone } = request.body;
        return {
            name,
            email,
            phone,
            createdBy: request.user,
        };
    }
    static mapWithoutPortfolio(request) {
        return this.map(request);
    }
}
exports.CreateUserRequestMapper = CreateUserRequestMapper;
//# sourceMappingURL=CreateUserRequestMapper.js.map