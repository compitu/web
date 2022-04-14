import {User} from './user';

export interface LoginPayload {
    access: string;
    refresh: string;
    user: User;
}
