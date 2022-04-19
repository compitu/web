import {createFeature, createReducer, on} from '@ngrx/store';
import {loginFormSubmit} from '../../modules/login/login.actions';
import {AuthError} from './auth-error';
import {
    initUserFetchFail,
    initUserFetchSuccess,
    loginPayloadFetchSuccess,
    loginUnauthorized,
    loginUnknownError,
} from './auth.effects.actions';

export interface AuthState {
    initialized: boolean;
    user:
        | {
              id: string;
              email: string;
          }
        | undefined;
    error: AuthError | undefined;
}

export const initialState: AuthState = {
    initialized: false,
    user: undefined,
    error: undefined,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(initUserFetchSuccess, (state, {user}): AuthState => {
            return {...state, user, initialized: true};
        }),
        on(initUserFetchFail, state => {
            return {...state, initialized: true};
        }),
        on(loginPayloadFetchSuccess, (state, {payload}): AuthState => {
            return {
                ...state,
                user: payload.user,
                initialized: true,
            };
        }),
        on(loginFormSubmit, state => {
            return {...state, error: undefined};
        }),
        on(loginUnauthorized, state => {
            return {...state, error: AuthError.UNAUTHORIZED};
        }),
        on(loginUnknownError, state => {
            return {...state, error: AuthError.UNKNOWN};
        })
    ),
});

export const {selectUser, selectAuthState, selectError} = authFeature;
