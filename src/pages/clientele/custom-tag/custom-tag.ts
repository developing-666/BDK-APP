import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';


import { CUSTOMTAGS } from '../../../providers/constants';
@Component({
    selector: 'page-custom-tag',
    templateUrl: 'custom-tag.html'
})
export class CustomTagPage {
    callback: any = this.navParams.get('callback');
    tag: any = this.navParams.get('tag') ? this.navParams.get('tag') : [];
    tags: Array<any> = CUSTOMTAGS;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController
    ) {}

    ionViewDidLoad() {
        console.log(this.tag);
    }
    newTag() {
        let prompt = this.alertCtrl.create({
            title: '输入客户标签',
            inputs: [
                {
                    name: 'tag',
                    placeholder: '请输入客户标签'
                }
            ],
            buttons: [
                {
                    text: '取消'
                },
                {
                    text: '确定',
                    handler: data => {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }
    done() {
        this.callback(this.tag).then(() => {
            this.navCtrl.pop();
        });
    }
    selectTag(tag) {
        let index = this.tag.indexOf(tag);
        if (index>-1){
            this.tag.splice(index,1);
        }else{
            this.tag.push(tag);
        }
    }
}
