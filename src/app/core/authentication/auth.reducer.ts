import {createFeature, createReducer, on} from '@ngrx/store';
import {
    loginDestroy,
    loginFormSubmit,
} from '../../modules/login/login.component.actions';
import {
    signUpDestroy,
    signUpFormSubmit,
} from '../../modules/sign-up/sign-up.component.actions';
import {
    initUserFetchFail,
    initUserFetchSuccess,
    loginPayloadFetchSuccess,
    loginUnauthorized,
    loginUnknownError,
    signupUserExist,
} from './auth.effects.actions';
import {LoginError} from './login-error';
import {SignUpError} from './sign-up-error';

export interface AuthState {
    initialized: boolean;
    user:
        | {
              id: string;
              email: string;
          }
        | undefined;
    loginError: LoginError | undefined;
    signUpError: SignUpError | undefined;
}

export const initialState: AuthState = {
    initialized: false,
    user: undefined,
    loginError: undefined,
    signUpError: undefined,
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
        on(loginFormSubmit, loginDestroy, state => {
            return {...state, loginError: undefined};
        }),
        on(loginUnauthorized, state => {
            return {...state, loginError: LoginError.UNAUTHORIZED};
        }),
        on(loginUnknownError, state => {
            return {...state, loginError: LoginError.UNKNOWN};
        }),
        on(signUpFormSubmit, signUpDestroy, state => {
            return {...state, signUpError: undefined};
        }),
        on(signupUserExist, state => {
            return {...state, signUpError: SignUpError.USEREXISTS};
        }),
        on(loginUnknownError, state => {
            return {...state, signUpError: SignUpError.UNKNOWN};
        })
    ),
});

export const {
    selectUser,
    selectAuthState,
    selectLoginError,
    selectSignUpError,
} = authFeature;
