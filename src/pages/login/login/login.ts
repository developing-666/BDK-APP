import { ViewChild, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    ngForm: FormGroup;
    formData: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi,
        private fb: FormBuilder
    ) {
        this.createForm();
    }
    mushrooms: boolean = true;

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    /**
     * 创建表单
     */
    createForm() {
        this.ngForm = this.fb.group(
            {
                phone: ['', [Validators.required, Validators.phone]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                agreement: ['', []]
            },
            { updateOn: 'blur' }
        );
    }
    get phone() {
        return this.ngForm.get('phone');
    }
    get password() {
        return this.ngForm.get('password');
    }
    get agreement() {
        return this.ngForm.get('agreement');
    }
    login() {
        this.appApi.login(this.formData).subscribe(d => {
            console.log(d);
        });
    }
    /** 
     * 测试 
     */    
    change() {
        console.log(this.ngForm);
        console.log('this.agreement',this.agreement);
        
    }
}
