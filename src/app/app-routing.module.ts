import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {HomeComponent} from './modules/home/home.component';

const routes: Routes = [
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
        path: '',
        component: HomeComponent,
        canActivate: [],
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
