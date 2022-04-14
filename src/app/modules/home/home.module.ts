import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';

@NgModule({
    imports: [CommonModule, MatButtonModule, RouterModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {}
