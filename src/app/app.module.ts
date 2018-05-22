//Angular以及ionic框架相关
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Config, IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

//业务相关组件、页面、模块
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/mine/about/about';

import { LoginModule } from '../pages/login/login.module';
import { RemindModule } from '../pages/remind/remind.module';
import { ClienteleModule } from '../pages/clientele/clientele.module';

//Ionic原生相关
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ImagePicker } from '@ionic-native/image-picker';
import { Network } from '@ionic-native/network';
import { AppMinimize } from '@ionic-native/app-minimize';
import { CodePush } from '@ionic-native/code-push';
import { CallNumber } from '@ionic-native/call-number';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HTTP } from '@ionic-native/http';


//ionic第三方插件
import { CalendarModule } from 'ion2-calendar';

//自己封装的服务、模块、方法等
import { NativeService } from '../providers/native-service';
import { HttpService } from '../providers/http-service';
import { FileService } from '../providers/file-service';
import { Helper } from '../providers/helper';
import { Utils } from '../providers/utils';
import { GlobalData } from '../providers/global-data';
import { FUNDEBUG_API_KEY, IS_DEBUG } from '../providers/constants';
import { Logger } from '../providers/logger';
import { ModalFromRightEnter, ModalFromRightLeave, ModalScaleEnter, ModalScaleLeave } from './modal-transitions';
import { CommonService } from '../service/common-service';
import { VersionService } from '../providers/version-service';
import { JPush } from '../../typings/modules/jpush/index';
import { Validators } from '../providers/validators';
// 参考文档:https://docs.fundebug.com/notifier/javascript/framework/ionic2.html
import * as fundebug from 'fundebug-javascript';

fundebug.apikey = FUNDEBUG_API_KEY;
fundebug.releasestage = IS_DEBUG ? 'development' : 'production'; // 应用开发阶段，development:开发;production:生产
fundebug.silent = !IS_DEBUG; // 如果暂时不需要使用Fundebug，将silent属性设为true

export class FunDebugErrorHandler implements ErrorHandler {
	handleError(err: any): void {
		fundebug.notifyError(err);
		console.error(err);
	}
}

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage
	],
	imports: [
		LoginModule,
		RemindModule,
		ClienteleModule,
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp, {
			mode: 'ios', // android是'md'
			backButtonText: ''
		}),
		IonicStorageModule.forRoot(),
		CalendarModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage
	],
	providers: [
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
		{ provide: ErrorHandler, useClass: FunDebugErrorHandler },
		NativeService,
		HttpService,
		FileService,
		Helper,
		Utils,
		GlobalData,
		Logger,
		CommonService,
		VersionService,
		Validators
	]
})
export class AppModule {
	constructor(public config: Config) {
		this.setCustomTransitions();
	}

	private setCustomTransitions() {
		this.config.setTransition('modal-from-right-enter', ModalFromRightEnter);
		this.config.setTransition('modal-from-right-leave', ModalFromRightLeave);
		this.config.setTransition('modal-scale-enter', ModalScaleEnter);
		this.config.setTransition('modal-scale-leave', ModalScaleLeave);
	}
}
