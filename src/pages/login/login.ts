import { Component, OnDestroy} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage implements OnDestroy {
    public showSpeener: boolean;

    public form: FormGroup;

    private subject = new Subject();

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

    ngOnDestroy() {
        this.subject.next(null);
        this.subject.complete();
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.showSpeener = true;

            this.auth
                .login(this.form.value)
                .pipe(takeUntil(this.subject))
                .subscribe(
                    res => {
                        this.auth.currentUser = res.user;

                        localStorage.setItem('token', res.token)
                        localStorage.setItem('user', JSON.stringify(res.user));
                        this.navCtrl.setRoot('HomePage');
                    },
                    err => {
                        this.showSpeener = false;
                        this.showLoader(`Ошибка: ${err.message}`);
                    }
                );

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
