import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { Observable, Subject } from 'rxjs';
import { IUser, EUserRole } from '../../models/login.model';
import { AuthProvider } from '../../providers/auth/auth';
import { CommonProvider } from '../../providers/common/common';
import { takeUntil } from 'rxjs/operators';

@IonicPage()
@Component({
    selector: 'page-users',
    templateUrl: 'users.html',
})
export class UsersPage implements OnDestroy {
    private subject = new Subject();

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
        this.loadUsers();

        this.currentUser = this.authService.currentUser;

        this.commonService.updateUsersPage
            .pipe(takeUntil(this.subject))
            .subscribe(res => {
                if (res) {
                    this.loadUsers();
                }
            })
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad UsersPage');
    }

    ngOnDestroy() {
        this.subject.next();
        this.subject.complete();
    }

    private loadUsers(): void {
        this.users$ = this.usersService.getUsers();
    }

    private deleteEvent(id: string): void {
        this.usersService.removeUser(id)
            .subscribe(
                res => {
                    this.commonService.showToast('Пользователь удален');
                    this.loadUsers();
                },
                err => this.commonService.showToast(err.message)
            );
    }

    public newUser(): void {
        this.navCtrl.push('NewUserPage');
    }

    public removeUser(user: IUser): void {
        this.alertCtrl
            .create({
                title: 'Вы точно хотите удалить?',
                buttons: [{
                    text: 'Да',
                    handler: data => this.deleteEvent(user._id)
                },
                {
                    text: 'Нет'
                }]
            })
            .present();
    }

    public updateUser(user: IUser, slidingItem: ItemSliding): void {
        slidingItem.close();
        this.navCtrl.push('NewUserPage', user);
    }

    public getRoles(role: number): string {
        switch (role) {
            case EUserRole.Admin:
                return 'админ';
            case EUserRole.Provider:
                return 'поставщик';
            case EUserRole.Seller:
                return 'продавец';
        }
    }

}
