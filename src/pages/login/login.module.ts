import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {
    MatInputModule,
    MatButtonModule,
} from '@angular/material';

@NgModule({
    declarations: [
        LoginPage,
    ],
    imports: [
        MatInputModule,
        MatButtonModule,
        IonicPageModule.forChild(LoginPage),
    ],
})
export class LoginPageModule { }
