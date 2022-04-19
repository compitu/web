import {createAction, props} from '@ngrx/store';
import {LoginPayload} from './login-payload';
import {User} from './user';

export const loginPayloadFetchSuccess = createAction(
    '[Auth Effects] Login Payload fetch success',
    props<{payload: LoginPayload}>()
);

export const loginUnauthorized = createAction(
    '[Auth Effects] Login unauthorized'
);

export const loginUnknownError = createAction(
    '[Auth Effects] Login unknown error'
);

export const initUserFetchSuccess = createAction(
    '[Auth Effects] Init User fetch success',
    props<{user: User | undefined}>()
);

export const initUserFetchFail = createAction(
    '[Auth Effects] Init User fetch fail'
);

export const signupSuccess = createAction(
    '[Auth Effects] Signup Payload fetch success',
    props<{email: string; password: string}>()
);

export const signupUserExist = createAction('[Auth Effects] Signup User exist');

export const signupUnknownError = createAction(
    '[Auth Effects] Signup unknown error'
);
