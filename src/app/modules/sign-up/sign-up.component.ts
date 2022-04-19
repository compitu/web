import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {signUpFormSubmit} from './sign-up.component.actions';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
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
}
