import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Validators } from '../../../providers/validators';
import { LoginPage } from '../login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: any;

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.legallyNamed]],
      verificationCode: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.phone]],
      password: ['', [Validators.required]]
    });
  }

  confirm() {
    this.navCtrl.setRoot(LoginPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
