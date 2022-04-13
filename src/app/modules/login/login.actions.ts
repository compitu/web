import {createAction, props} from '@ngrx/store';

export const loginFormSubmit = createAction(
    '[Login Component] Login Form submit',
    props<{email: string; password: string}>()
);
