import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, AlertController, Refresher } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { IPost, IPostParams } from '../../models/post.model';
import { CommonProvider } from '../../providers/common/common';
import { take } from 'rxjs/operators';
import { AuthProvider } from '../../providers/auth/auth';
import { IUser } from '../../models/login.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage implements OnDestroy {

    private refresher: Refresher;

    private params: IPostParams;

    private subject = new Subject();

    public posts: IPost[];

    public user: IUser;

    public showLoader = true;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private commonService: CommonProvider,
        private authService: AuthProvider,
        public navParams: NavParams,
        private postService: PostsProvider
    ) {
        this.getUser();

        this.resetParams();

        this.loadPosts();

        this.commonService
            .updateHomePage
            .pipe(takeUntil(this.subject))
            .subscribe(isUpdate => {
                if (isUpdate) {
                    this.loadPosts();
                };
            });
    }

    ngOnDestroy() {
        this.subject.next();
        this.subject.complete();
    }

    private resetParams(): void {
        this.params = {
            title: '',
            page: 0
        };
    }

    private loadPosts(): void {
        this.postService
            .getPosts(this.params)
            .pipe(take(1))
            .subscribe(posts => {
                this.posts = posts;
                this.showLoader = false;

                if (this.refresher) {
                    this.refresher.complete();
                }

            });
    }

    private getUser(): void {
        this.user = this.authService.currentUser;
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
        this.params.title = event.target.value || '';
        this.params.page = 0;

        this.loadPosts();
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

    public doRefresh(refresher: Refresher): void {
        this.refresher = refresher;
        this.params.page = 0;

        this.loadPosts();
    }

    public scrollPaging(scroll): void {
        this.params.page ++;

        this.postService
            .getPosts(this.params)
            .subscribe(posts => {
                this.showLoader = false;

                posts.forEach(p => this.posts.push(p));

                scroll.complete();
            });
    }

}
