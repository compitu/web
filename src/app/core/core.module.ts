import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {AuthEffects} from './authentication/auth.effects';
import {authFeature} from './authentication/auth.reducer';
import {AuthInterceptor} from './interceptors/auth.interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(authFeature),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [AuthService],
        },
    ],
})
export class CoreModule {}
