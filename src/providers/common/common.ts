import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

export interface ErrorInterface {
    controlName: string;
    error: string;
    group: AbstractControl;
    form: FormGroup;
    submitted: boolean;
}

@Injectable()
export class CommonProvider {

    constructor(public http: HttpClient) {
        console.log('Hello CommonProvider Provider');
    }

    public showError(errors: ErrorInterface) {
        const control = errors.group
            ? errors.group.get(errors.controlName)
            : errors.form.controls[errors.controlName];

        const showCondition = control && control.errors && Object.keys(control.errors).length ?
            control.dirty || control.touched || errors.submitted : false;

        return showCondition && (errors.error ? control.errors[errors.error] : true);
    }

}
