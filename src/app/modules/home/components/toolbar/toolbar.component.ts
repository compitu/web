import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    @Output()
    public sidenavToggleClick: EventEmitter<void> = new EventEmitter();
}
