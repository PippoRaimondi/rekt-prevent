export type UserPasswordReset = {
  token: string;
  userId: number;
  createdAt?: Date;
  expiresAt: Date;
  verifiedAt: Date | null;
};
