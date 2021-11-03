import { AuthenticableUser } from '../interfaces/AuthenticableUser';


export type User = AuthenticableUser &
{
    id: number;
    name: string;
};

