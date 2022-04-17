import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {AuthGuard} from './core/authentication/auth-guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./modules/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./modules/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'signup',
        loadChildren: () =>
            import('./modules/sign-up/sign-up.module').then(
                m => m.SignUpModule
            ),
    },
    {
        path: '**',
        loadChildren: () =>
            import('./modules/not-found/not-found.module').then(
                m => m.NotFoundModule
            ),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        StoreRouterConnectingModule.forRoot(),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
