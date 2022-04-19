import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, createAction, Store} from '@ngrx/store';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {logOutClick} from '../../modules/home/components/toolbar/toolbar.component.actions';
import {loginFormSubmit} from '../../modules/login/login.component.actions';
import {signUpFormSubmit} from '../../modules/sign-up/sign-up.component.actions';
import {
    initUserFetchFail,
    initUserFetchSuccess,
    loginPayloadFetchSuccess,
    loginUnauthorized,
    loginUnknownError,
    signupSuccess,
    signupUnknownError,
    signupUserExist,
} from './auth.effects.actions';
import {AuthService} from './auth.service';

const onInit = createAction('[AuthEffect]: Init');

@Injectable()
export class AuthEffects implements OnInitEffects {
    public constructor(
        private store: Store,
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    public login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginFormSubmit, signupSuccess),
            switchMap(action =>
                this.authService.login(action.email, action.password).pipe(
                    map(payload => loginPayloadFetchSuccess({payload})),
                    catchError(err => {
                        if (err.status === 401 || err.status === 404) {
                            return of(loginUnauthorized());
                        }
                        return of(loginUnknownError());
                    })
                )
            )
        );
    });

    public storeTokens$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginPayloadFetchSuccess),
                map(({payload}) => this.authService.storeTokens(payload))
            );
        },
        {dispatch: false}
    );

    public storeUser$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginPayloadFetchSuccess),
                map(({payload}) => this.authService.stroreUser(payload.user))
            );
        },
        {dispatch: false}
    );

    public fetchUserOnInit$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(onInit),
            switchMap(() =>
                this.authService.fetchUser().pipe(
                    map(user => initUserFetchSuccess({user})),
                    catchError(() => of(initUserFetchFail()))
                )
            )
        );
    });

    public redirectToHome$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginPayloadFetchSuccess),
                tap(() => {
                    this.router.navigateByUrl('');
                })
            );
        },
        {dispatch: false}
    );

    public signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signUpFormSubmit),
            switchMap(action =>
                this.authService.signup(action.email, action.password).pipe(
                    map(() =>
                        signupSuccess({
                            email: action.email,
                            password: action.password,
                        })
                    ),
                    catchError(err => {
                        if (err.status === 409) {
                            return of(signupUserExist());
                        }
                        return of(signupUnknownError());
                    })
                )
            )
        );
    });

    public signOut$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(logOutClick),
                tap(() => {
                    this.authService.clearTokens();
                    this.router.navigateByUrl('/login');
                })
            );
        },
        {dispatch: false}
    );

    public ngrxOnInitEffects(): Action {
        return onInit();
    }
}
