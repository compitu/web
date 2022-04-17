import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {signOutClick} from './home.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public constructor(private store: Store) {}

    public onSignOutClick(): void {
        this.store.dispatch(signOutClick());
    }
}
