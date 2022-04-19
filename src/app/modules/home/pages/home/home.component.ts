import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {signOutClick} from './home.component.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public sidenavOpened = true;

    public constructor(private store: Store) {}

    public onSignOutClick(): void {
        this.store.dispatch(signOutClick());
    }

    public onSidenavToggleClick(): void {
        this.sidenavOpened = !this.sidenavOpened;
    }
}
