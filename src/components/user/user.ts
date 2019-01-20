import { Component, Input, OnChanges } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { IUser } from '../../models/login.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'user',
    templateUrl: 'user.html'
})
export class UserComponent implements OnChanges {
    @Input() public userId: string;

    text: string;

    public user$: Observable<IUser>;

    constructor(
        private authProvider: AuthProvider
    ) {}

    ngOnChanges() {
        if (this.userId) {
            this.user$ = this.authProvider.getUser(this.userId);
        }
    }

}
