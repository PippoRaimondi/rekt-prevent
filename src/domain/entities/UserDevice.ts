export type UserDevice = {
  userId: number;
  type: string | null;
  family: 'ios' | 'android';
  token: string;
  createdAt?: Date;
};
