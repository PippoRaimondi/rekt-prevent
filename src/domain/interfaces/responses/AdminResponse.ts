export type AdminResponse = {
  id: number;
  name: string;
  email: string;
};

export type AdminResponseWithToken = {
  token: string;
  admin: AdminResponse;
};
