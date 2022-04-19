import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './pages/home/home.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        RouterModule,
        HomeRoutingModule,
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {}
