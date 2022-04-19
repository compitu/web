import {createAction, props} from '@ngrx/store';

export const signUpFormSubmit = createAction(
    '[SignUp Component] Sign Up Form submit',
    props<{email: string; password: string}>()
);

export const signUpDestroy = createAction('[SignUp Component] Sign Up destroy');
