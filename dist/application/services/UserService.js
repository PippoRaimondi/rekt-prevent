"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const date_fns_1 = require("date-fns");
const ValidationError_1 = require("../../application/errors/ValidationError");
const PaginationUtils_1 = require("../../application/utils/PaginationUtils");
const User_1 = require("../../domain/entities/User");
const PaginationMapper_1 = require("../../domain/mappers/PaginationMapper");
const UserMapper_1 = require("../../domain/mappers/UserMapper");
const UserVerificationMapper_1 = require("../../domain/mappers/UserVerificationMapper");
const User_2 = require("../interfaces/User");
class UserService {
    constructor(createUserValidator, resetPasswordValidator, updateUserValidator, repository, userAggregatorRepository, verificationRepository, passwordResetRepository, authService, mailer, uniqueIdentifierService) {
        this.createUserValidator = createUserValidator;
        this.resetPasswordValidator = resetPasswordValidator;
        this.updateUserValidator = updateUserValidator;
        this.repository = repository;
        this.userAggregatorRepository = userAggregatorRepository;
        this.verificationRepository = verificationRepository;
        this.passwordResetRepository = passwordResetRepository;
        this.authService = authService;
        this.mailer = mailer;
        this.uniqueIdentifierService = uniqueIdentifierService;
        this.DEFAULT_USER_STATUS = User_1.UserStatus.PENDING;
        this.USERS_PER_PAGE = 20;
        this.EXPIRES_IN_MINUTES = 1440;
    }
    async list(request) {
        const { filter, page, orderBy } = request;
        const offset = PaginationUtils_1.PaginationUtils.getOffsetByPage(page, this.USERS_PER_PAGE);
        const [users, count] = await this.repository.findAll(filter, { sortColumn: User_2.UserSortBy.CREATED_AT, direction: 'ASC' }, this.USERS_PER_PAGE, offset);
        return {
            users: users.map((user) => UserMapper_1.UserMapper.map(user)),
            pagination: PaginationMapper_1.PaginationMapper.map(page, count, this.USERS_PER_PAGE),
        };
    }
    async get(id) {
        const user = await this.repository.findById(id);
        return UserMapper_1.UserMapper.map(user);
    }
    async getByEmailOrNull(email) {
        try {
            const user = await this.repository.findByEmail(email);
            return UserMapper_1.UserMapper.map(user);
        }
        catch (error) {
            return null;
        }
    }
    async create(request) {
        this.createUserValidator.validate(request);
        const { createdBy, email, name, phone, password } = request;
        const encodedPassword = await this.authService.generatePassword(password);
        const user = await this.repository.create({
            name,
            status: this.DEFAULT_USER_STATUS,
            email,
            password: encodedPassword,
            phone: phone || null,
            createdById: (createdBy === null || createdBy === void 0 ? void 0 : createdBy.id) || 0,
        });
        await this.createVerificationTokenAndSendWelcomeEmail(user);
        return UserMapper_1.UserMapper.map(user);
    }
    async update(request) {
        this.updateUserValidator.validate(request);
        let encodedPassword;
        const { loggedUser, currentPassword, newPassword } = request;
        if (currentPassword) {
            const isSamePassword = await this.authService.comparePassword(currentPassword, loggedUser.password);
            if (!isSamePassword) {
                throw new ValidationError_1.ValidationError('A senha atual não é válida.');
            }
            encodedPassword = await this.authService.generatePassword(newPassword);
        }
        const user = Object.assign(Object.assign({}, loggedUser), { name: request.name || loggedUser.name, phone: request.phone || loggedUser.phone, password: encodedPassword || loggedUser.password, status: User_1.UserStatus.ACTIVE });
        await this.repository.update(user);
        return UserMapper_1.UserMapper.map(user);
    }
    updateLastLoginAt(user) {
        return this.repository.update(Object.assign(Object.assign({}, user), { lastLoginAt: new Date() }));
    }
    async delete(id) {
        const user = await this.repository.findById(id);
        await this.repository.delete(user);
        return UserMapper_1.UserMapper.map(user);
    }
    async validateWelcomeToken(token) {
        const { user, verifiedAt, } = await this.verificationRepository.findByToken(token);
        if (verifiedAt || (user === null || user === void 0 ? void 0 : user.status) !== this.DEFAULT_USER_STATUS) {
            throw new ValidationError_1.ValidationError('O usuário já está ativo.');
        }
        await this.verificationRepository.updateVerifiedAt({
            userId: user.id,
            token,
            verifiedAt: new Date(),
        });
        user.status = User_1.UserStatus.ACTIVE;
        await this.repository.update(user);
        const authToken = this.authService.generateToken(user);
        return {
            token: authToken,
            user: UserMapper_1.UserMapper.map(user),
        };
    }
    async resendInvite(id) {
        const user = await this.repository.findById(id);
        if (user.status === User_1.UserStatus.ACTIVE) {
            throw new ValidationError_1.ValidationError('O usuário já está ativo, portanto o convite não pode ser re-enviado.');
        }
        const userVerification = await this.createVerificationTokenAndSendWelcomeEmail(user);
        return UserVerificationMapper_1.UserVerificationMapper.map(userVerification);
    }
    async forgotPassword(email) {
        const user = await this.repository.findByEmail(email);
        if (user.status !== User_1.UserStatus.ACTIVE) {
            throw new ValidationError_1.ValidationError('Não é possível resetar a senha, entre em contato com o suporte.');
        }
        const token = this.uniqueIdentifierService.create();
        const expiresAt = (0, date_fns_1.addMinutes)(new Date(), this.EXPIRES_IN_MINUTES);
        const passwordReset = {
            userId: user.id,
            token,
            expiresAt,
            verifiedAt: null,
        };
        await this.passwordResetRepository.create(passwordReset);
        await this.sendForgotEmail(Object.assign(Object.assign({}, passwordReset), { user }));
    }
    async validateForgotPasswordToken(token) {
        const passwordReset = await this.passwordResetRepository.findByToken(token);
        if (this.isPasswordResetExpired(passwordReset) || passwordReset.verifiedAt) {
            throw new ValidationError_1.ValidationError('O link já expirou.');
        }
        await this.passwordResetRepository.updateVerifiedAt(Object.assign(Object.assign({}, passwordReset), { verifiedAt: new Date() }));
        const user = await this.repository.findById(passwordReset.user.id);
        const authToken = this.authService.generateToken(user);
        return {
            token: authToken,
            user: UserMapper_1.UserMapper.map(user),
        };
    }
    async resetPassword(request) {
        this.resetPasswordValidator.validate(request);
        const { password, loggedUser } = request;
        const newPassword = await this.authService.generatePassword(password);
        await this.repository.update(Object.assign(Object.assign({}, loggedUser), { password: newPassword }));
    }
    async createVerificationTokenAndSendWelcomeEmail(user) {
        const userVerification = await this.createVerificationToken(user);
        await this.sendWelcomeEmail(Object.assign(Object.assign({}, userVerification), { user }));
        return userVerification;
    }
    async createVerificationToken(user) {
        const token = this.uniqueIdentifierService.create();
        const userVerification = {
            token,
            userId: user.id,
            verifiedAt: null,
        };
        await this.verificationRepository.create(userVerification);
        return userVerification;
    }
    isPasswordResetExpired(passwordReset) {
        const { expiresAt } = passwordReset;
        const now = new Date();
        return now.getTime() > expiresAt.getTime();
    }
    async sendWelcomeEmail(userVerification) {
        const { token } = userVerification;
        const { name, email } = userVerification.user;
        await this.mailer.sendWelcomeEmail(name, email, token);
    }
    async sendForgotEmail(passwordReset) {
        const { expiresAt, token, user: { name, email }, } = passwordReset;
        const expiresAtFormatted = (0, date_fns_1.format)(expiresAt, 'dd/MM/yyyy HH:mm');
        await this.mailer.sendForgotPassword(name, email, token, expiresAtFormatted);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map