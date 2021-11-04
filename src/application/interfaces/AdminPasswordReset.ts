import { Admin } from '../../domain/entities/Admin';
import { AdminPasswordReset } from '../../domain/entities/AdminPasswordReset';

export type AdminPasswordResetWithRelations = AdminPasswordReset & {
  admin: Admin;
};
