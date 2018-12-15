import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { Observable } from 'rxjs';
import { IPost } from '../../models/post.model';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    public posts$: Observable<IPost>;

    public showLoader = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private postService: PostsProvider
    ) {
        this.getPosts();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

    public getPosts(): void {
        this.posts$ = this.postService.getPosts();
    }

    public searchEvent(event): void {
        console.log(event.target.value);
    }

    public newPost(): void {
        this.navCtrl.push('EditPostPage', {});
    }
}
