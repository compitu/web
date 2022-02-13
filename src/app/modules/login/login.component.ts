import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
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

    public onLoginClick(): void {
        this.http
            .post<{access: string; refresh: string}>('/api/auth/login', {
                email: 'test@test.com',
                password: 'test',
            })
            .subscribe(tokens => this.authService.storeTokens(tokens));
    }
}
