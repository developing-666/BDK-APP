import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Validators } from '../../../providers/validators';
import { LoginPage } from '../login';

@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html'
})
export class FindPasswordPage {
  findPasswordForm: any;

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder) {
    this.findPasswordForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.phone]],
      verificationCode: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  confirm() {
    this.navCtrl.setRoot(LoginPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
