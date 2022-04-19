import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {AuthError} from '../../core/authentication/auth-error';
import {selectError} from '../../core/authentication/auth.reducer';
import {loginFormSubmit} from './login.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public authError$ = this.store.select(selectError).pipe(
        map(error => {
            if (error === AuthError.UNAUTHORIZED) {
                return 'You have entered wrong email or password.';
            }
            if (error === AuthError.UNKNOWN) {
                return 'Something went wrong. Try again later.';
            }
            return error;
        })
    );

    public constructor(private store: Store) {}

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    public getEmailErrorMessage(): string {
        const emailControl = this.loginForm.get('email');
        if (emailControl?.hasError('required')) {
            return 'You must enter a value';
        }

        return emailControl?.hasError('email') ? 'Not a valid email' : '';
    }

    public getPasswordErrorMessage(): string {
        const passwordControl = this.loginForm.get('password');
        if (passwordControl?.hasError('required')) {
            return 'You must enter a value';
        }

        return '';
    }

    public onLoginSubmit(): void {
        this.store.dispatch(
            loginFormSubmit({
                email: this.loginForm.controls.email.value,
                password: this.loginForm.controls.password.value,
            })
        );
    }
}
