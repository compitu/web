import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './pages/home/home.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatSidenavModule,
        RouterModule,
        HomeRoutingModule,
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {}
