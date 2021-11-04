import { Admin } from '../../../../domain/entities/Admin';

export class AdminMapper {
  static mapFromDatabase(record: any, prefix = ''): Admin {
    return {
      id: +record[`${prefix}id`],
      name: record[`${prefix}name`],
      email: record[`${prefix}email`],
      password: record[`${prefix}password`],
    };
  }

  static mapToDatabase(entity: Admin): any {
    const { id, name, email, password } = entity;

    return {
      id,
      name,
      email,
      password,
    };
  }
}
