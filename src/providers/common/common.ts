import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';

export interface ErrorInterface {
    controlName: string;
    error: string;
    group: AbstractControl;
    form: FormGroup;
    submitted: boolean;
}

@Injectable()
export class CommonProvider {
    public updateHomePage = new BehaviorSubject<boolean>(false);

    constructor(public http: HttpClient, private toastCtrl: ToastController) {
    }

    public showError(errors: ErrorInterface) {
        const control = errors.group
            ? errors.group.get(errors.controlName)
            : errors.form.controls[errors.controlName];

        const showCondition = control && control.errors && Object.keys(control.errors).length ?
            control.dirty || control.touched || errors.submitted : false;

        return showCondition && (errors.error ? control.errors[errors.error] : true);
    }

    public showToast(message: string): void {
        this.toastCtrl
            .create({
                message,
                duration: 3000
            })
            .present();
    }

}
