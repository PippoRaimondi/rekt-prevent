import { Admin } from '../../domain/entities/Admin';

export type NewAdmin = Omit<Admin, 'id'>;