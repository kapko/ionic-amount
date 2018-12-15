import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonProvider } from '../../providers/common/common';
import { PostsProvider } from '../../providers/posts/posts';
import { Subscription } from 'rxjs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
    selector: 'page-edit-post',
    templateUrl: 'edit-post.html',
})
export class EditPostPage {

    public barcodeData: any;

    public paramsId: string;

    public form: FormGroup;

    public submitted: boolean;

    public note: string;

    private scanSub: Subscription;

    constructor(
        private common: CommonProvider,
        private fb: FormBuilder,
        private navController: NavController,
        private navParams: NavParams,
        // private qrScanner: QRScanner,
        private barcodeScanner: BarcodeScanner,
        private postService: PostsProvider,
    ) {
        this.form = this.fb.group({
            qrcode: [null],
            title: [null, [Validators.required]],
            price: [null, [Validators.required]],
            amount: [null, [Validators.required]],
            soldAmount: [null, [Validators.required]],
            created: [Date.now()],
        });
    }


    ngOnInit() {
    }

    public onSubmit(): void {
        console.log(this.form.value);
        if (this.form.valid) {
            if (this.paramsId) {
                // this.updatePost();
            } else {
                // this.createNew();
            }
        }
    }

    scan() {
        this.barcodeScanner.scan().then((barcodeData) => {
            this.barcodeData = barcodeData;
            console.log(barcodeData.text);

            this.form.get('qrcode').setValue(barcodeData.text);

        }, (err) => {
          console.log(err);
        });
      }

    // private updatePost(): void {
    //     this.postService
    //         .updatePost(this.paramsId, this.form.value)
    //         .subscribe(
    //             res => {
    //                 if (res['errors']) {
    //                     this.note = res['message'];
    //                 } else {
    //                     this.router.navigate(['/posts']);
    //                 }
    //             },
    //             err => {
    //                 this.note = err.message;
    //             }
    //         )
    // }

    // private createNew(): void {
    //     this.postService
    //         .createPost(this.form.value)
    //         .subscribe(
    //             res => {
    //                 if (res['errors']) {
    //                     this.note = res['message'];
    //                 } else {
    //                     this.router.navigate(['/posts']);
    //                 }
    //             },
    //             err => {
    //                 this.note = err.message;
    //             }
    //         );
    // }

    public hideNote(): void {
        this.note = null;
    }

}
