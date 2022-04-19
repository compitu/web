import {Component, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {logOutClick} from './toolbar.component.actions';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    @Output()
    public sidenavToggleClick: EventEmitter<void> = new EventEmitter();

    public constructor(private store: Store) {}

    public onLogOutClick(): void {
        this.store.dispatch(logOutClick());
    }
}
