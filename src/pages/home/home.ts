import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, AlertController } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { Observable } from 'rxjs';
import { IPost } from '../../models/post.model';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    public posts$: Observable<IPost>;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private commonService: CommonProvider,
        public navParams: NavParams,
        private postService: PostsProvider
    ) {
        this.posts$ = this.postService.getPosts();
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
        console.log(event.target.value);
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
