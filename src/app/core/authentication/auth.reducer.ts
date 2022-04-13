import {createFeature, createReducer, on} from '@ngrx/store';
import {loginPayloadFetchSuccess} from './auth.effects.actions';

export interface AuthState {
    user:
        | {
              id: string;
              email: string;
          }
        | undefined;
}

export const initialState: AuthState = {
    user: undefined,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(loginPayloadFetchSuccess, (state, {payload}): AuthState => {
            return {...state, user: payload.user};
        })
    ),
});
