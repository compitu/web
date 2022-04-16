import {createFeature, createReducer, on} from '@ngrx/store';
import {
    initUserFetchFail,
    initUserFetchSuccess,
    loginPayloadFetchSuccess,
} from './auth.effects.actions';

export interface AuthState {
    initialized: boolean;
    user:
        | {
              id: string;
              email: string;
          }
        | undefined;
}

export const initialState: AuthState = {
    initialized: false,
    user: undefined,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(loginPayloadFetchSuccess, (state, {payload}): AuthState => {
            return {...state, user: payload.user, initialized: true};
        }),
        on(initUserFetchSuccess, (state, {user}): AuthState => {
            return {...state, user, initialized: true};
        }),
        on(initUserFetchFail, state => {
            return {...state, initialized: true};
        })
    ),
});

export const {selectUser, selectAuthState} = authFeature;
