import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, createAction, Store} from '@ngrx/store';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {loginFormSubmit} from '../../modules/login/login.actions';
import {signupFormSubmit} from '../../modules/sign-up/signup.actions';
import {
    initUserFetchFail,
    initUserFetchSuccess,
    loginPayloadFetchSuccess,
    signupSuccess,
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
                this.authService.login(action.email, action.password)
            ),
            map(payload => loginPayloadFetchSuccess({payload}))
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
            ofType(signupFormSubmit),
            switchMap(action =>
                this.authService.signup(action.email, action.password).pipe(
                    map(() => ({
                        email: action.email,
                        password: action.password,
                    }))
                )
            ),
            map(({email, password}) => signupSuccess({email, password}))
        );
    });

    public ngrxOnInitEffects(): Action {
        return onInit();
    }

    /*public login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginFormSubmit, registerSuccess),
            switchMap(action =>
                this.authService.login(action.email, action.password).pipe(
                    map(data => {
                        this.cookieService.put('access', data.access);
                        this.cookieService.put('refresh', data.refresh);
                        return loginSuccess();
                    }),
                    catchError(() => of(loginFail()))
                )
            )
        );
    });

    public fetchUserOnInit$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(onInit),
            switchMap(() => this.authService.user$),
            map(user => userFetchSuccess({user})),
            catchError(() => of(userFetchFail()))
        );
    });

    public fetchUserOnLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            switchMap(() => this.authService.user$),
            map(user => userFetchSuccess({user}))
        );
    });

    public logOut$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(logOutClick),
                switchMap(() =>
                    this.authService.logOut().pipe(
                        map(() => {
                            this.cookieService.remove('access');
                            this.cookieService.remove('refresh');
                        })
                    )
                )
            );
        },
        {dispatch: false}
    );

    public register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerFormSubmit),
            switchMap(action =>
                this.authService
                    .register(action.email, action.password, action.name)
                    .pipe(
                        map(() =>
                            registerSuccess({
                                email: action.email,
                                password: action.password,
                            })
                        ),
                        catchError(() => of(registerFail()))
                    )
            )
        );
    });*/
}
