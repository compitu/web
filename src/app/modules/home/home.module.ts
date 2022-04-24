import {LayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {ContentComponent} from './components/content/content.component';
import {MainListComponent} from './components/sidenav/main-list/main-list.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './pages/home/home.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        LayoutModule,
        RouterModule,
        HomeRoutingModule,
        MatListModule,
    ],
    declarations: [
        HomeComponent,
        ToolbarComponent,
        SidenavComponent,
        ContentComponent,
        MainListComponent,
    ],
    exports: [HomeComponent],
})
export class HomeModule {}
