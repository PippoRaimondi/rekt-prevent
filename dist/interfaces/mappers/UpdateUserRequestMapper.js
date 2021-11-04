"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRequestMapper = void 0;
class UpdateUserRequestMapper {
    static map(request) {
        const { name, phone, currentPassword, newPassword, newPasswordConfirmation } = request.body;
        return {
            name,
            phone,
            currentPassword,
            newPassword,
            newPasswordConfirmation,
            loggedUser: request.user,
        };
    }
}
exports.UpdateUserRequestMapper = UpdateUserRequestMapper;
//# sourceMappingURL=UpdateUserRequestMapper.js.map