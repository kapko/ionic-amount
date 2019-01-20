import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding, Refresher } from 'ionic-angular';
import { ISold } from '../../models/sold.model';
import { ProvidersSoldProvider } from '../../providers/providers-sold/providers-sold';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { IPostParams } from '../../models/post.model';

@IonicPage()
@Component({
    selector: 'page-sold',
    templateUrl: 'sold.html',
})
export class SoldPage implements OnDestroy {

    private subject = new Subject();

    private refresher: Refresher;

    private params: IPostParams;

    public showLoader = true;

    public soldData: ISold[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private soldProvider: ProvidersSoldProvider
    ) {

        this.resetParams();
        this.loadSolds();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SoldPage');
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

    private loadSolds(): void {
        this.soldProvider
            .getSoldPosts(this.params)
            .subscribe(solds => {
                this.soldData = solds;
                this.showLoader = false;

                if (this.refresher) {
                    this.refresher.complete();
                }

            });
    }

    public searchEvent(event): void {
        this.params.title = event.target.value || '';
        this.params.page = 0;

        this.loadSolds();
    }

    public doRefresh(refresher: Refresher): void {
        this.refresher = refresher;
        this.params.page = 0;

        this.loadSolds();
    }

    public scrollPaging(scroll): void {
        this.params.page ++;

        this.soldProvider
            .getSoldPosts(this.params)
            .subscribe(solds => {
                this.showLoader = false;

                solds.forEach(p => this.soldData.push(p));

                scroll.complete();
            });
    }



}
