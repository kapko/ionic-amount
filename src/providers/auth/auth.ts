import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, IUser } from '../../models/login.model';
import { Observable } from 'rxjs/Observable';
import { env } from '../../env/env';


@Injectable()
export class AuthProvider {
    public currentUser: IUser;

    private api: string

    constructor(public http: HttpClient) {
        this.api = env.api;

        if (localStorage.user) {
            this.currentUser = JSON.parse(localStorage.user);
        }
    }

    public login(data: IUser): Observable<ILogin> {
        return this.http.post<ILogin>(`${this.api}login`, data);
    }

    public getUser(userId: string): Observable<IUser> {
        return this.http.get<IUser>(`${this.api}users/${userId}`);
    }

}
