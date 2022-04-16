import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    public constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.fetchUser().pipe(
            map(user => {
                console.log(user);
                if (user) {
                    return true;
                }
                this.router.navigate(['/login']);
                return false;
            }),
            catchError(err => {
                console.log(err);
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
