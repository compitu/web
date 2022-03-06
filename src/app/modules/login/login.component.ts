import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/core/authentication/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    public onLoginSubmit(): void {
        this.http
            .post<{access: string; refresh: string}>('/api/auth/login', {
                email: this.loginForm.controls.email.value,
                password: this.loginForm.controls.password.value,
            })
            .subscribe(tokens => this.authService.storeTokens(tokens));
    }
}
