import { Admin } from '../entities/Admin';
import { AdminResponse } from '../interfaces/responses/AdminResponse';

export class AdminMapper {
  /**
   * @deprecated
   */
  static toJSON(entity: Admin): AdminResponse {
    return this.map(entity);
  }

  static map(entity: Admin): AdminResponse {
    const { name, email } = entity;

    return {
      id: entity.id as number,
      name,
      email,
    };
  }
}
