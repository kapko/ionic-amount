import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../../models/login.model';
import { Observable } from 'rxjs/Observable';
import { env } from '../../env/env';


@Injectable()
export class AuthProvider {
    private api: string

    constructor(public http: HttpClient) {
        this.api = env.api;
    }

    public login(data: ILogin): Observable<string> {
        return this.http.post<string>(`${this.api}login`, data);
    }

}
