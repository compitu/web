import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {AuthInterceptor} from './interceptors/auth.interceptor';

@NgModule({
    declarations: [],
    imports: [CommonModule],
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
