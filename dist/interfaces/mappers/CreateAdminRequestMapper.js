"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminRequestMapper = void 0;
class CreateAdminRequestMapper {
    static map(request) {
        const { name, email, password } = request.body;
        return {
            name,
            email,
            password
        };
    }
    static mapWithoutPortfolio(request) {
        return this.map(request);
    }
}
exports.CreateAdminRequestMapper = CreateAdminRequestMapper;
//# sourceMappingURL=CreateAdminRequestMapper.js.map