//Angular以及ionic框架相关
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/zh';
import localeZhExtra from '@angular/common/locales/extra/zh';
import { HttpModule } from '@angular/http';
import {
	BrowserModule,
	HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import {
	Config,
	IonicApp,
	IonicModule,
	IonicErrorHandler
} from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

//业务相关组件、页面、模块
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login/login';
import { HomePage } from '../pages/home/home';
import { ManagePage } from '../pages/manage/manage/manage';
import { RemindPage } from '../pages/remind/remind/remind';
import { ClientelePage } from '../pages/clientele/clientele/clientele';
import { SettingsPage } from '../pages/settings/settings/settings';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { CalendarModule } from 'ion2-calendar';
import { AlphaScrollModule } from '../modules/alpha-scroll/alpha-scroll.module';
import * as ionicGalleryModal from '../modules/ion-gallery/index';

//Ionic原生相关
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { AppMinimize } from '@ionic-native/app-minimize';
import { CodePush } from '@ionic-native/code-push';
import { CallNumber } from '@ionic-native/call-number';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HTTP } from '@ionic-native/http';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
import { Media } from '@ionic-native/media';
import { Base64 } from '@ionic-native/base64';
import { JPush } from '@jiguang-ionic/jpush';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Contacts } from '@ionic-native/contacts';
import { ThreeDeeTouch } from '@ionic-native/three-dee-touch';
import { ThreeDeeTouchProvider } from '../providers/three-dee-touch';
//ionic第三方插件

//自己封装的服务、模块、方法等

import { AppApi } from '../providers/app-api';
import { NativeService } from '../providers/native-service';
import { HttpHeader } from '../providers/http-header';
import { HttpService } from '../providers/http-service';
import { FileService } from '../providers/file-service';
import { Helper } from '../providers/helper';
import { Utils } from '../providers/utils';
import { GlobalData } from '../providers/global-data';
import { JpushNotification } from '../providers/jpush-notification';
//import { FUNDEBUG_API_KEY, IS_DEBUG } from '../providers/constants';
import { Logger } from '../providers/logger';
import { Pinyin } from '../providers/pinyin';

import {
	ModalFromRightEnter,
	ModalFromRightLeave,
	ModalScaleEnter,
	ModalScaleLeave
} from './modal-transitions';
import { CommonService } from '../service/common-service';
import { VersionService } from '../providers/version-service';
import { Validators } from '../providers/validators';
// 参考文档:https://docs.fundebug.com/notifier/javascript/framework/ionic2.html
//import * as fundebug from 'fundebug-javascript';

//fundebug.apikey = FUNDEBUG_API_KEY;
//fundebug.releasestage = IS_DEBUG ? 'development' : 'production'; // 应用开发阶段，development:开发;production:生产
//fundebug.silent = !IS_DEBUG; // 如果暂时不需要使用Fundebug，将silent属性设为true

//export class FunDebugErrorHandler implements ErrorHandler {
//	handleError(err: any): void {
//		fundebug.notifyError(err);
//		console.error(err);
//	}
//}

registerLocaleData(localeZh, 'zh', localeZhExtra);
@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ManagePage,
		RemindPage,
		LoginPage,
		SettingsPage,
		ClientelePage
	],
	imports: [
		ComponentsModule,
		BrowserModule,
		HttpModule,
		CalendarModule,
		AlphaScrollModule.forRoot(),
		IonicModule.forRoot(MyApp, {
			//			mode: 'ios', // android是'md'
			backButtonText: '',
			swipeBackEnabled: true
		}),
		IonicStorageModule.forRoot(),
		ionicGalleryModal.GalleryModalModule,
		PipesModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ManagePage,
		RemindPage,
		LoginPage,
		SettingsPage,
		ClientelePage
	],
	providers: [
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: ionicGalleryModal.GalleryModalHammerConfig
		},
		{ provide: LOCALE_ID, useValue: 'zh' },
		AppApi,
		StatusBar,
		SplashScreen,
		AppVersion,
		Camera,
		Toast,
		File,
		FileTransfer,
		FileOpener,
		InAppBrowser,
		ImagePicker,
		Network,
		AppMinimize,
		Diagnostic,
		HTTP,
		JPush,
		CodePush,
		CallNumber,
		BarcodeScanner,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		NativeService,
		HttpHeader,
		HttpService,
		FileService,
		Helper,
		Utils,
		GlobalData,
		Logger,
		CommonService,
		VersionService,
		Validators,
		Keyboard,
		Media,
		Device,
		Base64,
		SMS,
		LocalNotifications,
		JpushNotification,
		Contacts,
		Pinyin,
		ThreeDeeTouch,
		ThreeDeeTouchProvider
	]
})
export class AppModule {
	constructor(public config: Config) {
		this.setCustomTransitions();
	}

	private setCustomTransitions() {
		this.config.setTransition(
			'modal-from-right-enter',
			ModalFromRightEnter
		);
		this.config.setTransition(
			'modal-from-right-leave',
			ModalFromRightLeave
		);
		this.config.setTransition('modal-scale-enter', ModalScaleEnter);
		this.config.setTransition('modal-scale-leave', ModalScaleLeave);
	}
}
