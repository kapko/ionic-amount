import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { MatButtonModule, MatCardModule, MatTabsModule, MatChipsModule, MatIconModule } from "@angular/material";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatChipsModule,
        MatIconModule,
        ComponentsModule
    ],
    exports: [
        HomePage
    ]
})
export class HomePageModule { }
