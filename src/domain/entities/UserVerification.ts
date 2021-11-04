import { Timestampable } from '../interfaces/Timestamble';

export type UserVerification = Timestampable & {
  token: string;
  userId: number;
  verifiedAt: Date | null;
};
