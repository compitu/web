import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {NotFoundRoutingModule} from './not-found-routing.module';
import {NotFoundComponent} from './not-found.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule,
        NotFoundRoutingModule,
    ],
    declarations: [NotFoundComponent],
    exports: [NotFoundComponent],
})
export class NotFoundModule {}
