import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, AlertController } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { IPost } from '../../models/post.model';
import { CommonProvider } from '../../providers/common/common';
import { take } from 'rxjs/operators';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    public posts: IPost[];

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private commonService: CommonProvider,
        public navParams: NavParams,
        private postService: PostsProvider
    ) {
        this.loadPosts();
        this.commonService
            .updateHomePage
            .subscribe(isUpdate => {
                if (isUpdate) {
                    this.loadPosts();
                };
            });
    }

    private loadPosts(): void {
        this.postService
            .getPosts()
            .pipe(take(1))
            .subscribe(posts => {
                this.posts = posts;
            });
    }

    private deleteEvent(_id: string): void {
        this.postService
            .removePost(_id)
            .subscribe(
                res => this.commonService.showToast('Успешно удалили'),
                err => this.commonService.showToast(err.message)
            )
    }

    public searchEvent(event): void {
    }

    public newPost(): void {
        this.navCtrl.push('EditPostPage');
    }

    public deletePost(post: IPost): void {
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

    public updatePost(post: IPost, slidingItem: ItemSliding): void {
        slidingItem.close();
        this.navCtrl.push('EditPostPage', post);
    }

}
