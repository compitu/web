import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {loginFormSubmit} from './login.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public constructor(private store: Store) {}

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    public onLoginSubmit(): void {
        this.store.dispatch(
            loginFormSubmit({
                email: this.loginForm.controls.email.value,
                password: this.loginForm.controls.password.value,
            })
        );
    }
}
