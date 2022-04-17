import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {AuthGuard} from './core/authentication/auth-guard';
import {HomeComponent} from './modules/home/home.component';
import {NotFoundComponent} from './modules/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
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
    {component: NotFoundComponent, path: '**'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        StoreRouterConnectingModule.forRoot(),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
