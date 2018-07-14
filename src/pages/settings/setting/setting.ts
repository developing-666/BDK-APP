import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { PushMessagePage } from '../push-message/push-message';
import { ChangePasswordPage } from '../change-password/change-password';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
})
export class SettingPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetController: ActionSheetController
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }


    /** 
     * 跳转修改密码页面 
     */    
    toChangePasswordPage() {
        this.navCtrl.push(ChangePasswordPage);
    }
    /** 
     * 跳转推送消息设置页面 
     */    
    toPushMessagePage() {
        this.navCtrl.push(PushMessagePage);
    }


    /**
     * 注销账号
     */
    async cancellationAccount() {
        const actionSheet = await this.actionSheetController.create({
            title: '确定注销账号吗？',
            buttons: [
                {
                    text: '注销账号',
                    role: 'destructive',
                    handler: () => {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await actionSheet.present();
    }

    /**
     * 清理缓存
     */
    async clearCache() {
        const actionSheet = await this.actionSheetController.create({
            title: '确定清除本地缓存？',
            buttons: [
                {
                    text: '清除缓存',
                    role: 'destructive',
                    handler: () => {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await actionSheet.present();
    }

    
}
