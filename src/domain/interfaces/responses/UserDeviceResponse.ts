export type UserDeviceResponse = {
  type: string | null;
  family: 'ios' | 'android';
  token: string;
  createdAt?: Date;
};
