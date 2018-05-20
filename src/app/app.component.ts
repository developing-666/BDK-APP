
import { Component, ViewChild } from '@angular/core';
import { Events, IonicApp, Keyboard, ModalController, Nav, Platform, ToastController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login/login';
// import { AboutPage } from '../pages/mine/about/about';

import { UserInfo } from '../model/user-info';

import { NativeService } from '../providers/native-service';
import { Helper } from '../providers/helper';
import { Storage } from '@ionic/storage';
import { GlobalData } from '../providers/global-data';
import { Utils } from '../providers/utils';
import { CommonService } from '../service/common-service';
import { VersionService } from '../providers/version-service';


import { RemindPage } from '../pages/remind/remind/remind';
import { NewRemindPage } from '../pages/remind/new-remind/new-remind';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;

  constructor(private platform: Platform,
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
    private nativeService: NativeService) {
    platform.ready().then(() => {
      // this.nav.setRoot(TabsPage); // 设置首页
      this.nav.setRoot(LoginPage); // 设置首页
      // this.nativeService.statusBarStyle(); // 设置状态栏颜色
      // this.assertNetwork(); // 检测网络
      // this.helper.funDebugInit(); // 初始化fundebug
      // this.helper.alloyLeverInit(); // 本地"开发者工具"
      // this.helper.initJpush(); // 初始化极光推送
      // this.jPushOpenNotification(); // 处理打开推送消息事件
      // 订阅重新登录事件
      // this.events.subscribe('user:reLogin', () => {
      //   this.modalCtrl.create(LoginPage).present();
      // });
      // 从缓存中获取token
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
      // this.registerBackButtonAction(); // 注册android返回按键事件
      // this.versionService.checkVersion(); // 检查版本更新
      // this.nativeService.sync(); // 启动app检查热更新
      // Utils.sessionStorageClear(); // 清除数据缓存
    });
  }

  // 检测网络
  assertNetwork() {
    if (!this.nativeService.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
  }

  // 注册android返回按键事件
  registerBackButtonAction() {
    if (!this.nativeService.isAndroid()) {
      return;
    }
    this.platform.registerBackButtonAction(() => {
      this.events.publish('android:backButtonAction');
      if (this.keyboard.isOpen()) { // 如果键盘开启则隐藏键盘
        this.keyboard.close();
        return;
      }
      // 如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
      const activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
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
      return activeNav.canGoBack() ? activeNav.pop() : this.nativeService.minimize();
    }, 1);
  }

  // 极光推送
  jPushOpenNotification() {
    // 当点击极光推送消息跳转到指定页面
    this.events.subscribe('jpush.openNotification', content => {
      const childNav = this.nav.getActiveChildNav();
      if (childNav) {
        const tab = childNav.getSelected();
        const activeVC = tab.getActive();
        // if (activeVC.component == AboutPage) {//如果当前所在页面就是将要跳转到的页面则不处理
        //   return;
        // }
        const activeNav = activeVC.getNav();
        activeNav.popToRoot({}).then(() => { // 导航跳到最顶层
          childNav.select(3); // 选中第四个tab
          const t = childNav.getSelected(); // 获取选中的tab
          const v = t.getActive(); // 通过当前选中的tab获取ViewController
          const n = v.getNav(); // 通过当前视图的ViewController获取的NavController
          // n.push(AboutPage); // 跳转到指定页面
        });
      }
    });
  }

}
