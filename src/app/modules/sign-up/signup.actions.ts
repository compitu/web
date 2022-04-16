import {createAction, props} from '@ngrx/store';

export const signupFormSubmit = createAction(
    '[Signup Component] Signup Form submit',
    props<{email: string; password: string}>()
);
