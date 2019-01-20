import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule , MatInputModule} from "@angular/material";
import { SellingButtonComponent } from './selling-button/selling-button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user';

@NgModule({
	declarations: [SellingButtonComponent,
    UserComponent],
	imports: [
		MatButtonModule,
		MatInputModule,
		FormsModule,
		CommonModule
	],
	exports: [SellingButtonComponent,
    UserComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
