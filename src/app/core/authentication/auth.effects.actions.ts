import {createAction, props} from '@ngrx/store';
import {LoginPayload} from './login-payload';

export const loginPayloadFetchSuccess = createAction(
    '[Auth Service] Login Payload fetch success',
    props<{payload: LoginPayload}>()
);
