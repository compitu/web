import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {signupFormSubmit} from './signup.actions';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
    public constructor(private store: Store) {}

    public signupForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    public onSignupSubmit(): void {
        this.store.dispatch(
            signupFormSubmit({
                email: this.signupForm.controls.email.value,
                password: this.signupForm.controls.password.value,
            })
        );
    }
}
