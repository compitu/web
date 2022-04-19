import {BreakpointObserver} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public sidenavMode$: Observable<MatDrawerMode>;

    public constructor(private breakpointObserver: BreakpointObserver) {
        this.sidenavMode$ = breakpointObserver
            .observe('only screen and (max-width: 800px)')
            .pipe(map(state => (state.matches ? 'over' : 'side')));
    }
}
