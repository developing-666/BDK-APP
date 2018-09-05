import { Component, ViewChild, NgZone } from '@angular/core';
import {
	Events,
	IonicApp,
	Keyboard,
	ModalController,
	Nav,
	Platform,
	ToastController,
} from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login/login';

import { JpushNotification } from '../providers/jpush-notification';
import { NativeService } from '../providers/native-service';
import { Helper } from '../providers/helper';
import { Storage } from '@ionic/storage';
import { GlobalData } from '../providers/global-data';
import { CommonService } from '../service/common-service';
import { VersionService } from '../providers/version-service';
import { HttpHeader } from '../providers/http-header';
import { CodePush } from '@ionic-native/code-push';
import { ThreeDeeTouch} from '@ionic-native/three-dee-touch';
import { ThreeDeeTouchProvider} from '../providers/three-dee-touch';

import { CODE_PUSH_DEPLOYMENT_KEY, IS_DEBUG } from '../providers/constants';


import { Device } from '@ionic-native/device';
import * as VConsole from '../assets/lib/vconsole.min';
function _window(): any {
	// return the global native browser window object
	return window;
}

// let vconsole = _window().VConsole;

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	current: any;
	constructor(
		private platform: Platform,
		private keyboard: Keyboard,
		private ionicApp: IonicApp,
		private storage: Storage,
		private globalData: GlobalData,
		private helper: Helper,
		private toastCtrl: ToastController,
		private modalCtrl: ModalController,
		private events: Events,
		private commonService: CommonService,
		private versionService: VersionService,
		private nativeService: NativeService,
		private device: Device,
		private httpHeader: HttpHeader,
		private codePush: CodePush,
		private zone: NgZone,
		private jpushNotification: JpushNotification,
		private threeDeeTouch: ThreeDeeTouch,
		private threeDTouch:ThreeDeeTouchProvider
	) {
		platform.resume.subscribe(d => {
			console.log('我又回来了');
			this.helper.setIosIconBadgeNumber(0);
			// this.assetsSync();
		});
		platform.ready().then(() => {
			this.nativeService.getVersionNumber().subscribe(
				v => {
					this.httpHeader.appVersion = v;
				},
				() => {
					console.log('获取appVersion失败');
				}
			);
			if (this.nativeService.isMobile()) {
				var vConsole = new VConsole();
				this.threeDeeTouch.isAvailable().then(isAvailable => {
					if(isAvailable){
						this.threeDTouch.init(this.nav);
					}
				})
			};
			this.nativeService.statusBarStyle(); // 设置状态栏颜色
			this.nativeService.splashScreenHide(); // 隐藏启动页
			this.assertNetwork(); // 检测网络
			// this.helper.funDebugInit(); // 初始化fundebug
			// this.helper.alloyLeverInit(); // 本地"开发者工具"

			this.storage.get('notFirstOpen').then(notFirstOpen => {
				console.log('notFirstOpen', notFirstOpen);
				if (notFirstOpen) {
					// 订阅重新登录事件
					this.events.subscribe('user:reLogin', () => {
						if (this.globalData.modalLoginPage == false) {
							this.modalCtrl.create(LoginPage).present();
							this.globalData.modalLoginPage = true;
						}
					});
					// 从缓存中获取token
					this.storage.get('token').then(token => {
						if (token) {
							this.httpHeader.token = token;
							this.storage.get('user').then(u => {
								this.globalData.user = u;
							});
							this.nav.setRoot(HomePage); // 设置首页
							this.jPushOpenNotification(); // 处理打开推送消息事件
							this.helper.initJpush(); // 初始化极光推送
							this.helper.setIosIconBadgeNumber(0);
						} else {
							//打开推送时，未登录状态未解决
							this.nav.setRoot(LoginPage); // 设置首页
							this.jPushOpenNotification(); // 处理打开推送消息事件
							this.helper.initJpush(); // 初始化极光推送
						}
					});
				} else {
					this.nav.setRoot('GuidePage'); // 设置首页
					this.helper.initJpush(); // 初始化极光推送
				}
			});

			// this.storage.get('token').then(token => {
			//   if (token) {
			//     this.nav.setRoot(TabsPage); // 设置首页
			//     this.globalData.token = token;
			//     // 用旧token获取新token,旧token作为请求头
			//     this.commonService.getNewToken().mergeMap(newToken => {
			//       this.globalData.token = newToken;
			//       this.storage.set('token', newToken);
			//       return this.commonService.getUserInfo();
			//     }).subscribe((userInfo: UserInfo) => {
			//       this.helper.loginSuccessHandle(userInfo);
			//     });
			//   } else {
			//     this.nav.setRoot(LoginPage); // 设置首页
			//   }
			//   this.nativeService.splashScreenHide(); // 隐藏启动页
			// });
			this.registerBackButtonAction(); // 注册android返回按键事件
			// this.versionService.checkVersion(); // 检查版本更新
			// this.assetsSync(); // 启动app检查热更新
			// Utils.sessionStorageClear(); // 清除数据缓存
		});
	}
	assetsSync() {
		const downloadProgress = progress => {
			this.zone.run(() => {
				this.current = Math.floor(
					(progress.receivedBytes / progress.totalBytes) * 100
				);
			});
		};
		if (this.nativeService.isMobile()) {
			let deploymentKey = '';
			if (this.nativeService.isAndroid() && IS_DEBUG) {
				deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Staging;
			}
			if (this.nativeService.isAndroid() && !IS_DEBUG) {
				deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Production;
			}
			if (this.nativeService.isIos() && IS_DEBUG) {
				deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Staging;
			}
			if (this.nativeService.isIos() && !IS_DEBUG) {
				deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Production;
			}
			this.codePush
				.sync(
					{
						deploymentKey
					},
					downloadProgress
				)
				.subscribe(syncStatus => {
					if (syncStatus == 0) {
						console.log(
							'[CodePush]:app已经是最新版本;syncStatus:' +
							syncStatus
						);
					} else if (syncStatus == 3) {
						console.log(
							'[CodePush]:更新出错;syncStatus:' + syncStatus
						);
					} else if (syncStatus == 5) {
						console.log(
							'[CodePush]:检查是否有更新;syncStatus:' + syncStatus
						);
					} else if (syncStatus == 7) {
						console.log(
							'[CodePush]:准备下载安装包;syncStatus:' + syncStatus
						);
					} else if (syncStatus == 8) {
						console.log(
							'[CodePush]:下载完成准备安装;syncStatus:' +
							syncStatus
						);
					} else {
						console.log('[CodePush]:syncStatus:' + syncStatus);
					}
				});
		}
	}
	// 检测网络
	assertNetwork() {
		if (!this.nativeService.isConnecting()) {
			this.toastCtrl
				.create({
					message: '未检测到网络,请连接网络',
					showCloseButton: true,
					closeButtonText: '确定'
				})
				.present();
		}
	}

	// 注册android返回按键事件
	registerBackButtonAction() {
		console.log(this.platform);

		if (!this.nativeService.isAndroid()) {
			return;
		}
		this.platform.registerBackButtonAction(() => {
			this.events.publish('android:backButtonAction');
			if (this.keyboard.isOpen()) {
				// 如果键盘开启则隐藏键盘
				this.keyboard.close();
				return;
			}
			// 如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
			// this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
			const activePortal =
				this.ionicApp._modalPortal.getActive() ||
				this.ionicApp._toastPortal.getActive() ||
				this.ionicApp._overlayPortal.getActive();
			if (activePortal) {
				activePortal.dismiss();
				return;
			}
			const childNav = this.nav.getActiveChildNav(); // 获取tabs导航,this.nav是总导航,tabs是子导航
			if (!childNav) {
				this.nativeService.minimize();
				return;
			}
			const tab = childNav.getSelected(); // 获取选中的tab
			const activeVC = tab.getActive(); // 通过当前选中的tab获取ViewController
			const activeNav = activeVC.getNav(); // 通过当前视图的ViewController获取的NavController
			return activeNav.canGoBack()
				? activeNav.pop()
				: this.nativeService.minimize();
		}, 1);
	}
	// 极光推送
	jPushOpenNotification() {
		// 当点击极光推送消息跳转到指定页面
		this.events.subscribe('jpush.openNotification', content => {
			console.log('接收极光推送通知----------------------------------');
			console.log(content.extras);
			console.log(content.extras.event);
			console.log(content.extras.data);
			console.log(content.extras.type);
			console.log(this.nav.length());
			this.globalData.nav = this.nav;
			this.jpushNotification.done(content.extras);
			// const childNav = this.nav.getActiveChildNav();
			// if (childNav) {
			//     const tab = childNav.getSelected();
			//     const activeVC = tab.getActive();
			//     // if (activeVC.component == AboutPage) {//如果当前所在页面就是将要跳转到的页面则不处理
			//     //   return;
			//     // }
			//     const activeNav = activeVC.getNav();
			//     activeNav.popToRoot({}).then(() => {
			//         // 导航跳到最顶层
			//         childNav.select(1); // 选中第四个tab
			//         const t = childNav.getSelected(); // 获取选中的tab
			//         const v = t.getActive(); // 通过当前选中的tab获取ViewController
			//         const n = v.getNav(); // 通过当前视图的ViewController获取的NavController
			//         // n.push(AboutPage); // 跳转到指定页面
			//     });
			// }
		});
	}
}
