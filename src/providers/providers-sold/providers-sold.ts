import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISold } from '../../models/sold.model';
import { env } from '../../env/env';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders(),
};

@Injectable()
export class ProvidersSoldProvider {
    private api: string;

    constructor(public http: HttpClient) {
        this.api = env.api;
    }

    public getSoldPosts(params): Observable<ISold[]> {
        const options = Object.assign({params}, httpOptions);

        return this.http.get<ISold[]>(`${this.api}sold`, options);
    }

    public createSoldPost(post: ISold): Observable<ISold> {
        return this.http.post<ISold>(`${this.api}sold/add`, post);
    }

    // public updatePost(id: string, post: IPost): Observable<IPost> {
    //     return this.http.patch<IPost>(`${this.api}posts/update/${id}`, post);
    // }

    // public getPost(id: string): Observable<IPost> {
    //     return this.http.get<IPost>(`${this.api}posts/post/${id}`);
    // }

    // public removePost(id: string): Observable<IPost> {
    //     return this.http.delete<IPost>(`${this.api}posts/delete/${id}`);
    // }


}
