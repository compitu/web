import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public constructor(private http: HttpClient) {}

    public onUserClick(): void {
        this.http
            .get('/api/users/61ffda22656c86c5a8add10b')
            .subscribe(console.log);
    }
}
