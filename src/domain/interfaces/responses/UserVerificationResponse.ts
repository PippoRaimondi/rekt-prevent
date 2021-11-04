import { UserResponse } from './UserResponse';

export type UserVerificationResponse = {
  user: UserResponse;
  token: string;
  verifiedAt?: Date;
};
