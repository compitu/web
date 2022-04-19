import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {selectSignUpError} from '../../core/authentication/auth.reducer';
import {SignUpError} from '../../core/authentication/sign-up-error';
import {signUpDestroy, signUpFormSubmit} from './sign-up.component.actions';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnDestroy {
    public authError$ = this.store.select(selectSignUpError).pipe(
        map(error => {
            if (error === SignUpError.USEREXISTS) {
                return 'User with the same email address already exists.';
            }
            if (error === SignUpError.UNKNOWN) {
                return 'Something went wrong. Try again later.';
            }
            return error;
        })
    );

    public constructor(private store: Store) {}

    public signUpForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    public onSignUpSubmit(): void {
        this.store.dispatch(
            signUpFormSubmit({
                email: this.signUpForm.controls.email.value,
                password: this.signUpForm.controls.password.value,
            })
        );
    }

    public ngOnDestroy(): void {
        this.store.dispatch(signUpDestroy());
    }
}
