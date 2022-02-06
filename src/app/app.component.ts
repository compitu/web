import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public constructor(private http: HttpClient) {}

    public onRegister(email: string, password: string, evt: Event): void {
        evt.preventDefault();
        console.log(email, password);
        this.http
            .post('/api/auth/register', {email, password})
            .subscribe(console.log);
    }

    public onLogin(email: string, password: string, evt: Event): void {
        evt.preventDefault();
        console.log(email, password);
        this.http
            .post('/api/auth/login', {email, password})
            .subscribe(console.log);
    }

    public onSignOut(): void {
        this.http.get('/api/auth/logout').subscribe(console.log);
    }

    public onGetUserClick(): void {
        this.http
            .get('/api/users/61ffb8b84dbae02df93c186c')
            .subscribe(console.log);
    }
}
