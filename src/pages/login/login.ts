import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public showSpeener: boolean;

    public form: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private toast: ToastController,
        private auth: AuthProvider,
        private fb: FormBuilder) {

        this.form = this.fb.group({
            name: ['', [Validators.required]],
            phone: [null, [Validators.required]]
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.showSpeener = true;

            this.auth.login(this.form.value)
                .subscribe(
                    token => {
                        localStorage.setItem('token', token)
                        this.navCtrl.setRoot('HomePage');
                    },
                    err => {
                        this.showSpeener = false;
                        this.showLoader(`Ошибка: ${err.message}`);
                    }
                )

        }

    }

    private showLoader(text: string): void {
        this.toast
            .create({
                message: text,
                duration: 2500,
                dismissOnPageChange: true,
            })
            .present();
    }
}
