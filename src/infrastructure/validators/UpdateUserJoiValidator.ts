import joi from '@hapi/joi';

import { UpdateUserValidator } from '../../domain/validators/UpdateUserValidator';
import { BaseValidator } from './BaseValidator';

export class UpdateUserJoiValidator extends BaseValidator implements UpdateUserValidator {
  protected readonly settingsSchema: joi.ObjectSchema = joi.object({
    receiveMarketCloseReport: joi.boolean().default(false),
    showNavigationWizard: joi.boolean().default(true),
    showHomeWizard: joi.boolean().default(true),
    showLiveReportWizard: joi.boolean().default(true),
    showPushNotificationsWizard: joi.boolean().default(true),
    showMyPortfoliosWizard: joi.boolean().default(true),
    showCompanyAnalysisWizard: joi.boolean().default(true),
    showComparisonAnalysisWizard: joi.boolean().default(true),
    showHeatmapAnalysisWizard: joi.boolean().default(true),
  });

  protected readonly schema: joi.AlternativesSchema = joi.alternatives().try(
    joi.object({
      loggedUser: joi.any().required(),
      name: joi.string().optional(),
      phone: joi.string().optional(),
      settings: this.settingsSchema.allow(null).optional(),

      currentPassword: joi.forbidden(),
      newPassword: joi.forbidden(),
      newPasswordConfirmation: joi.forbidden(),
    }),
    joi.object({
      loggedUser: joi.any().required(),
      name: joi.string().optional(),
      phone: joi.string().optional(),
      settings: this.settingsSchema.allow(null).optional(),

      currentPassword: joi.string().required(),
      newPassword: joi.string().required(),
      newPasswordConfirmation: joi.string().required().valid(joi.ref('newPassword')),
    })
  );
}
