import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../env/env';
import { IPost, IPostParams } from '../../models/post.model';

const httpOptions = {
    headers: new HttpHeaders(),
};

@Injectable()
export class PostsProvider {

    private api: string;

    constructor(public http: HttpClient) {
        this.api = env.api;
    }

    public getPosts(params: IPostParams): Observable<IPost[]> {
        const options = Object.assign({params}, httpOptions);

        return this.http.get<IPost[]>(`${this.api}posts`, options);
    }

    public createPost(post: IPost): Observable<IPost> {
        return this.http.post<IPost>(`${this.api}posts/add`, post);
    }

    public updatePost(id: string, post: IPost): Observable<IPost> {
        return this.http.patch<IPost>(`${this.api}posts/update/${id}`, post);
    }

    public getPost(id: string): Observable<IPost> {
        return this.http.get<IPost>(`${this.api}posts/post/${id}`);
    }

    public removePost(id: string): Observable<IPost> {
        return this.http.delete<IPost>(`${this.api}posts/delete/${id}`);
    }

}
