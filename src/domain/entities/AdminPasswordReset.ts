export type AdminPasswordReset = {
  token: string;
  adminId: number;
  createdAt?: Date;
  expiresAt: Date;
  verifiedAt: Date | null;
};
