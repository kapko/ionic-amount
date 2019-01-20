import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoldPage } from './sold';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        SoldPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(SoldPage),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldPageModule { }
