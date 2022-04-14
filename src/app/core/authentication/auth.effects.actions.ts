import {createAction, props} from '@ngrx/store';
import {LoginPayload} from './login-payload';
import {User} from './user';

export const loginPayloadFetchSuccess = createAction(
    '[Auth Service] Login Payload fetch success',
    props<{payload: LoginPayload}>()
);

export const initUserFetchSuccess = createAction(
    '[Auth Service] Init User fetch success',
    props<{user: User | undefined}>()
);

export const initUserFetchFail = createAction(
    '[Auth Service] Init User fetch fail'
);
