import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewUserPage } from './new-user';
import {
  MatInputModule,
  MatButtonModule,
  MatRadioModule
} from '@angular/material';

@NgModule({
  declarations: [
    NewUserPage,
  ],
  imports: [
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    IonicPageModule.forChild(NewUserPage),
  ],
})
export class NewUserPageModule {}
