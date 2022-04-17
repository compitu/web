import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {
    BehaviorSubject,
    catchError,
    filter,
    Observable,
    switchMap,
    take,
} from 'rxjs';
import {AuthService} from 'src/app/core/authentication/auth.service';

export class AuthInterceptor implements HttpInterceptor {
    private refreshingInProgress?: boolean;
    private accessTokenSubject: BehaviorSubject<string | undefined> =
        new BehaviorSubject<string | undefined>(undefined);

    public constructor(private authService: AuthService) {}

    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const accessToken = this.authService.getAccessToken();
        return next.handle(this.addAuthHeader(req, accessToken)).pipe(
            catchError(err => {
                // in case of 401 http error
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    // get refresh tokens
                    const refreshToken = this.authService.getRefreshToken();

                    // if there are tokens then send refresh token request
                    if (refreshToken && accessToken) {
                        return this.refreshToken(req, next, refreshToken);
                    }
                    // otherwise logout
                    this.authService.clearTokens();
                    throw err;
                }

                // in case of 403 http error (refresh token failed)
                if (err instanceof HttpErrorResponse && err.status === 403) {
                    // logout
                    this.authService.clearTokens();
                    throw err;
                }
                // if error has status neither 401 nor 403 then just return this error
                throw err;
            })
        );
    }

    private refreshToken(
        request: HttpRequest<any>,
        next: HttpHandler,
        refreshToken: string
    ): Observable<HttpEvent<any>> {
        if (!this.refreshingInProgress) {
            this.refreshingInProgress = true;
            this.accessTokenSubject.next(undefined);

            return this.authService.refreshToken(refreshToken).pipe(
                switchMap(tokens => {
                    this.refreshingInProgress = false;
                    this.accessTokenSubject.next(tokens.access);
                    this.authService.storeTokens(tokens);
                    // repeat failed request with new token
                    return next.handle(
                        this.addAuthHeader(request, tokens.access)
                    );
                }),
                catchError(err => {
                    this.refreshingInProgress = false;
                    this.accessTokenSubject.error('Token expired.');
                    throw err;
                })
            );
        } else {
            // wait while getting new token
            return this.accessTokenSubject.pipe(
                filter(token => token !== undefined),
                take(1),
                switchMap(token => {
                    // repeat failed request with new token
                    return next.handle(this.addAuthHeader(request, token));
                })
            );
        }
    }

    private addAuthHeader(
        req: HttpRequest<unknown>,
        token: string | undefined
    ): HttpRequest<unknown> {
        if (token != undefined && token.length > 0) {
            return req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
        }

        return req;
    }
}
