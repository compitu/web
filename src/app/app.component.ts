import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public constructor(private http: HttpClient) {}

    public onSubmit(email: string, password: string, evt: Event): void {
        evt.preventDefault();
        console.log(email, password);
        this.http
            .post('/api/auth/login', {email, password})
            .subscribe(console.log);
    }

    public onSignOut(): void {
        this.http.get('/api/auth/logout').subscribe(console.log);
    }
}
