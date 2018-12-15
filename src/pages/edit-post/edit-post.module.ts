import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPostPage } from './edit-post';
import {
  MatInputModule,
  MatButtonModule,
} from '@angular/material';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    EditPostPage,
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    IonicPageModule.forChild(EditPostPage),
  ],
  providers: [
    BarcodeScanner,
  ]
})
export class EditPostPageModule {}
