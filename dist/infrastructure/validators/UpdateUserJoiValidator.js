"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserJoiValidator = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const BaseValidator_1 = require("./BaseValidator");
class UpdateUserJoiValidator extends BaseValidator_1.BaseValidator {
    constructor() {
        super(...arguments);
        this.settingsSchema = joi_1.default.object({
            receiveMarketCloseReport: joi_1.default.boolean().default(false),
            showNavigationWizard: joi_1.default.boolean().default(true),
            showHomeWizard: joi_1.default.boolean().default(true),
            showLiveReportWizard: joi_1.default.boolean().default(true),
            showPushNotificationsWizard: joi_1.default.boolean().default(true),
            showMyPortfoliosWizard: joi_1.default.boolean().default(true),
            showCompanyAnalysisWizard: joi_1.default.boolean().default(true),
            showComparisonAnalysisWizard: joi_1.default.boolean().default(true),
            showHeatmapAnalysisWizard: joi_1.default.boolean().default(true),
        });
        this.schema = joi_1.default.alternatives().try(joi_1.default.object({
            loggedUser: joi_1.default.any().required(),
            name: joi_1.default.string().optional(),
            phone: joi_1.default.string().optional(),
            settings: this.settingsSchema.allow(null).optional(),
            currentPassword: joi_1.default.forbidden(),
            newPassword: joi_1.default.forbidden(),
            newPasswordConfirmation: joi_1.default.forbidden(),
        }), joi_1.default.object({
            loggedUser: joi_1.default.any().required(),
            name: joi_1.default.string().optional(),
            phone: joi_1.default.string().optional(),
            settings: this.settingsSchema.allow(null).optional(),
            currentPassword: joi_1.default.string().required(),
            newPassword: joi_1.default.string().required(),
            newPasswordConfirmation: joi_1.default.string().required().valid(joi_1.default.ref('newPassword')),
        }));
    }
}
exports.UpdateUserJoiValidator = UpdateUserJoiValidator;
//# sourceMappingURL=UpdateUserJoiValidator.js.map