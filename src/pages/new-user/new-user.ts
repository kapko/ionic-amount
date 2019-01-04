import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
    selector: 'page-new-user',
    templateUrl: 'new-user.html',
})
export class NewUserPage {
    public roles = [];

    public form: FormGroup;

    public showSpeener: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private common: CommonProvider,
        private viewCtrl: ViewController,
        private fb: FormBuilder,
        private userService: UsersServiceProvider
    ) {

        this.form = this.fb.group({
            name: [null, [Validators.required]],
            role: [null, [Validators.required]],
            phone: [null, [Validators.required]],
        });

        this.roles = [
            {
                name: 'Админ',
                value: 1
            },
            {
                name: 'Продавец',
                value: 2
            },
            {
                name: 'Поставщик',
                value: 3
            }
        ];

        this.getUserData();
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('');
    }

    private getUserData(): void {
        const data = this.navParams.data;

        if (Object.keys(data).length) {
            this.form.get('name').setValue(data.name);
            this.form.get('phone').setValue(data.phone);
            this.form.get('role').setValue(data.role);
        }
    }

    private createUser(): void {
        this.userService
            .createUser(this.form.value)
            .subscribe(
                res => {
                    if (res['errors']) {
                        this.common.showToast(res['message']);
                        this.showSpeener = false;
                    } else {
                        this.navCtrl.pop();
                        this.common.updateUsersPage.next(true)
                    }
                },
                err => {
                    this.common.showToast(err.message);
                    this.showSpeener = false;
                }
            );
    }

    private updateUser(): void {
        this.userService
            .updateUser(this.navParams.data._id, this.form.value)
            .subscribe(
                res => {
                    if (res['errors']) {
                        this.common.showToast(res['message']);
                        this.showSpeener = false;
                    } else {
                        this.navCtrl.pop();
                        this.common.updateUsersPage.next(true)
                    }
                },
                err => {
                    this.common.showToast(err.message);
                    this.showSpeener = false;
                }
            );
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.showSpeener = true;

            if (!Object.keys(this.navParams.data).length) {
                this.createUser();
            } else {
                this.updateUser();
            }
            
        }
    }

    

}
