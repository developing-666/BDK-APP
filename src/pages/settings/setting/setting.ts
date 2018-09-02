import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ActionSheetController,
	ToastController
} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { HttpHeader } from '../../../providers/http-header';
import { LoginPage } from './../../login/login/login';
import { GlobalData } from '../../../providers/global-data';


@IonicPage()
@Component({
	selector: 'page-setting',
	templateUrl: 'setting.html'
})
export class SettingPage {
	fileSize: number = 0; //缓存文件大小
	canPresentToast: boolean = true;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public actionSheetController: ActionSheetController,
		private file: File,
		private storage: Storage,
		private globalData: GlobalData,
		private httpHeader: HttpHeader,
		private toastCtrl: ToastController,
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingPage');
		this.getCacheDirSize();
	}

    /**
     * 跳转修改密码页面
     */

	toChangePasswordPage() {
		this.navCtrl.push('ChangePasswordPage');
	}
    /**
     * 跳转推送消息设置页面
     */

	toPushMessagePage() {
		this.navCtrl.push('PushMessagePage');
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
						this.storage.set('token', '');
						this.httpHeader.token = '';
						this.globalData.initData();
						this.navCtrl.setRoot(LoginPage);
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
     * 注销账号
     */
	logout() {
		const actionSheet = this.actionSheetController.create({
			buttons: [
				{
					text: '退出登录',
					handler: () => {
						this.storage.remove('token');
						this.httpHeader.token = undefined;
						this.globalData.initData();
						this.navCtrl.setRoot(LoginPage);
					}
				},
				{
					text: '取消',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
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
						this.canPresentToast = true;
						this.removeCacheFile();
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

	getCacheDirSize(path: string = this.file.tempDirectory) {
		this.file
			.listDir(path, '')
			.then(d => {
				console.log('getCacheDirSize ---d.length', d.length);

				d.forEach(e => {
					console.log(e.name);
					if (e.isFile) {
						e.getMetadata(
							suc => {
								console.log('success  d.size====', suc.size);
								this.fileSize += suc.size;
							},
							err => {
								console.log('err======');
								console.log(err);
							}
						);
					} else {
						this.getCacheDirSize(e.nativeURL);
					}
				});
			})
			.catch(err => {
				console.log("tempDirectory doesn't exist", err);
			});
	}

	removeCacheFile(path: string = this.file.tempDirectory) {
		if (this.fileSize == 0) {
			this.presentNoDataToast();
			return;
		}
		this.file
			.listDir(path, '')
			.then(d => {
				d.forEach(e => {
					console.log(
						'removeCacheFile-----d.length',
						d.length,
						e.name
					);

					if (e.isFile) {
						this.file
							.removeFile(this.file.tempDirectory, e.name)
							.then(() => {
								console.log(e.name, '删除成功');
								this.listDir();
							})
							.catch(err => {
								console.log(
									e.name,
									'删除失败：',
									err.code,
									err.messsage
								);
							});
					} else {
						this.file
							.removeRecursively(e.nativeURL, '')
							.then(() => {
								this.listDir();
							})
							.catch(err => {
								console.log(
									'删除失败：',
									err.code,
									err.messsage
								);
							});
					}
				});
			})
			.catch(err => {
				console.log("tempDirectory doesn't exist", err);
			});
	}

	listDir() {
		this.file.listDir(this.file.tempDirectory, '').then(d => {
			if (d.length == 0) {
				this.fileSize = 0;
				this.presentToast();
				this.canPresentToast = false;
			}
		});
	}

	presentToast() {
		if (!this.canPresentToast) {
			return;
		}
		const toast = this.toastCtrl.create({
			message: '缓存清理成功',
			position: 'middle',
			duration: 1500
		});
		// toast.onDidDismiss(() => {
		// });
		toast.present();
	}

	presentNoDataToast() {
		const toast = this.toastCtrl.create({
			message: '暂无可清理缓存',
			position: 'middle',
			duration: 1500
		});
		// toast.onDidDismiss(() => {
		// });
		toast.present();

	}
}
