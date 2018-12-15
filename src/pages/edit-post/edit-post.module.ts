import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPostPage } from './edit-post';
import {
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  declarations: [
    EditPostPage,
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    IonicPageModule.forChild(EditPostPage),
  ],
})
export class EditPostPageModule {}
