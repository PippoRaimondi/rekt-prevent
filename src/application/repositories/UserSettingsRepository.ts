import { UserSettings } from '../../domain/entities/UserSettings';

export interface UserSettingsRepository {
  findByUserId(id: number): Promise<UserSettings>;
  findByUserIdOrNull(id: number): Promise<UserSettings | null>;

  update(entity: UserSettings): Promise<boolean>;
}
