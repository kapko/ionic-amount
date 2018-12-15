import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Navbar } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonProvider } from '../../providers/common/common';
import { PostsProvider } from '../../providers/posts/posts';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IPost } from '../../models/post.model';

@IonicPage()
@Component({
    selector: 'page-edit-post',
    templateUrl: 'edit-post.html',
})
export class EditPostPage {
    @ViewChild(Navbar) navBar: Navbar;

    public barcodeData: any;

    public paramsId: string;

    public form: FormGroup;

    public submitted: boolean;

    public note: string;

    private data: IPost;

    constructor(
        private common: CommonProvider,
        private fb: FormBuilder,
        private navController: NavController,
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private barcodeScanner: BarcodeScanner,
        private postService: PostsProvider,
    ) {
        this.data = (this.navParams.data && this.navParams.data._id) ? this.navParams.data : null;

        this.form = this.fb.group({
            qrcode: [null],
            title: [null, [Validators.required]],
            price: [null, [Validators.required]],
            amount: [null, [Validators.required]],
            soldAmount: [null, [Validators.required]],
            created: [Date.now()],
        });

        if (this.data) {
            this.setFormData(this.navParams.data);
        }
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('');
    }

    private setFormData(data: IPost): void {
        this.form.get('qrcode').setValue(data.qrcode);
        this.form.get('title').setValue(data.title);
        this.form.get('price').setValue(data.price);
        this.form.get('amount').setValue(data.amount);
        this.form.get('soldAmount').setValue(data.soldAmount);
    }

    public onSubmit(): void {
        if (this.form.valid) {
            if (this.data) {
                this.updatePost();
            } else {
                this.createNew();
            }
        }
    }

    public showScanner() {
        this.barcodeScanner.scan()
            .then(
                (b) => this.form.get('qrcode').setValue(b.text),
                (err) => console.log(err)
            )
            .catch(err => console.log(err));
      }

    private updatePost(): void {
        this.postService
            .updatePost(this.data._id, this.form.value)
            .subscribe(
                res => {
                    if (res['errors']) {
                        this.common.showToast(res['message']);
                    } else {
                        this.navController.pop();
                        this.common.updateHomePage.next(true);
                    }
                },
                err => this.common.showToast(err.message)
            );
    }

    private createNew(): void {
        this.postService
            .createPost(this.form.value)
            .subscribe(
                res => {
                    if (res['errors']) {
                        this.common.showToast(res['message']);
                    } else {
                        this.navController.pop();
                        this.common.updateHomePage.next(true);
                    }
                },
                err => this.common.showToast(err.message)
            );
    }

}
