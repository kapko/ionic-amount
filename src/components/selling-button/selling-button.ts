import { Component, Input } from '@angular/core';
import { IPost } from '../../models/post.model';
import { ProvidersSoldProvider } from '../../providers/providers-sold/providers-sold';
import { ISold } from '../../models/sold.model';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'selling-button',
    templateUrl: 'selling-button.html'
})
export class SellingButtonComponent {
    @Input() public post: IPost;

    public showSpeener: boolean;

    public sellingCount: number;

    private uid: string;

    constructor(
        private soldProvider: ProvidersSoldProvider,
        private alertCtr: AlertController
    ) {
        this.uid = JSON.parse(localStorage.user)._id;
    }

    public toSell(): void {
        if (!+this.sellingCount) {return; }

        this.showSpeener = true;

        const soldPost: ISold = {
            title: this.post.title,
            qrcode: this.post.qrcode,
            customer: null,
            count: +this.sellingCount,
            created: Date.now(),
            price: this.post.price,
            seller: this.uid
        }

        this.soldProvider.createSoldPost(soldPost)
            .subscribe(
                res => this.showAlert(false, res),
                err => this.showAlert(false, null));
    }

    private showAlert(err: boolean = false, res: ISold): void {
        this.alertCtr
            .create({
                title: err ? 'Ошибка' : 'Вы продали',
                message: err ? 'Ошибка скажите Админу!' : `${res.title} ${res.count}`,
                buttons: [{text: 'Ok'}]
            })
            .present();
        this.showSpeener = false;
    }
}
