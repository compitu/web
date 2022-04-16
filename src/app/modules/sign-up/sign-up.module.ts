import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {SignUpRoutingModule} from './sign-up-routing.module';
import {SignUpComponent} from './sign-up.component';

@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SignUpRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class SignUpModule {}
