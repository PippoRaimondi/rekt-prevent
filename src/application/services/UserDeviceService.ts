import { User } from '../../domain/entities/User';
import { CreateUserDeviceRequest } from '../../domain/interfaces/requests/CreateUserDeviceRequest';
import { UserDeviceResponse } from '../../domain/interfaces/responses/UserDeviceResponse';
import { UserDeviceMapper } from '../../domain/mappers/UserDeviceMapper';
import { CreateUserDeviceValidator } from '../../domain/validators/CreateUserDeviceValidator';
import { UserDeviceRepository } from '../repositories';

export class UserDeviceService {
  constructor(
    private readonly createDeviceValidator: CreateUserDeviceValidator,
    private readonly repository: UserDeviceRepository
  ) {}

  async list(loggedUser: User): Promise<UserDeviceResponse[]> {
    const devices = await this.repository.findAllByUserId(loggedUser.id);

    return devices.map((device) => UserDeviceMapper.map(device));
  }

  async create(request: CreateUserDeviceRequest): Promise<UserDeviceResponse> {
    this.createDeviceValidator.validate(request);

    const { user, family, token, type } = request;
    const userDevice = {
      userId: user.id,
      token,
      type: type ?? null,
      family,
    };

    await this.repository.create(userDevice);

    return UserDeviceMapper.map(userDevice);
  }

  async delete(token: string, loggedUser: User): Promise<UserDeviceResponse> {
    const userDevice = await this.repository.findByTokenAndUserId(token, loggedUser.id);
    await this.repository.delete(userDevice);

    return UserDeviceMapper.map(userDevice);
  }
}
