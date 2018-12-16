import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { Observable } from 'rxjs';
import { IUser, EUserRole } from '../../models/login.model';
import { AuthProvider } from '../../providers/auth/auth';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
    selector: 'page-users',
    templateUrl: 'users.html',
})
export class UsersPage {

    public users$: Observable<IUser[]>;

    public currentUser: IUser;

    constructor(
        public navCtrl: NavController,
        private authService: AuthProvider,
        public navParams: NavParams,
        private commonService: CommonProvider,
        private alertCtrl: AlertController,
        private usersService: UsersServiceProvider
    ) {
        this.users$ = this.usersService.getUsers();

        this.currentUser = this.authService.currentUser;
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad UsersPage');
    }

    private deleteEvent(id: string): void {
        this.usersService.removeUser(id)
            .subscribe(
                res => this.commonService.showToast('Пользователь удален'),
                err => this.commonService.showToast(err.message)
            );
    }

    public newUser(): void {
        this.navCtrl.push('NewUserPage');
    }

    public removeUser(post: IUser): void {
        this.alertCtrl
            .create({
                title: 'Вы точно хотите удалить?',
                buttons: [{
                    text: 'Да',
                    handler: data => this.deleteEvent(post._id)
                    },
                    {
                    text: 'Нет'
                }]
            })
            .present();
    }

    public getRoles(role: number): string {
        switch (role) {
            case EUserRole.Admin:
                return 'админ';
            case EUserRole.Editer:
                return 'пользователь';
            case EUserRole.Seller:
                return 'продавец';
        }
    }

}
