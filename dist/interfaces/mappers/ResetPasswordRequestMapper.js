"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordRequestMapper = void 0;
class ResetPasswordRequestMapper {
    static map(request) {
        const { password, passwordConfirmation } = request.body;
        return {
            password,
            passwordConfirmation,
            loggedUser: request.user,
        };
    }
}
exports.ResetPasswordRequestMapper = ResetPasswordRequestMapper;
//# sourceMappingURL=ResetPasswordRequestMapper.js.map