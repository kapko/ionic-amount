import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../env/env';
import { IPost } from '../../models/post.model';

@Injectable()
export class PostsProvider {

    private api: string;

    constructor(public http: HttpClient) {
        this.api = env.api;
    }

    public getPosts(): Observable<IPost> {
        return this.http.get<IPost>(`${this.api}posts`);
    }

}
