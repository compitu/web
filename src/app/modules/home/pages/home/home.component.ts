import {BreakpointObserver} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {signOutClick} from './home.component.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public sidenavMode$: Observable<MatDrawerMode>;

    public constructor(
        private store: Store,
        private breakpointObserver: BreakpointObserver
    ) {
        this.sidenavMode$ = breakpointObserver
            .observe('only screen and (max-width: 800px)')
            .pipe(map(state => (state.matches ? 'over' : 'side')));
    }

    public onSignOutClick(): void {
        this.store.dispatch(signOutClick());
    }
}
