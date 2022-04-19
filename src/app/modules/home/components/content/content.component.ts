import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {signOutClick} from './content.component.actions';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
    public constructor(private store: Store) {}

    public onSignOutClick(): void {
        this.store.dispatch(signOutClick());
    }
}
