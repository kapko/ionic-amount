import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../env/env';
import { Observable } from 'rxjs';
import { IUser } from '../../models/login.model';

@Injectable()
export class UsersServiceProvider {
    private api: string;

    constructor(public http: HttpClient) {
        this.api = env.api;
    }

    public getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${this.api}users`);
    }

    public createUser(post: IUser): Observable<IUser> {
        return this.http.post<IUser>(`${this.api}users/add`, post);
    }

    public updateUser(id: string, user: IUser): Observable<IUser> {
        return this.http.patch<IUser>(`${this.api}users/update/${id}`, user);
    }

    public removeUser(id: string): Observable<IUser> {
        return this.http.delete<IUser>(`${this.api}users/delete/${id}`);
    }

}
