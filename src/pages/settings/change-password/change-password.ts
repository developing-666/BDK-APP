import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Validators } from '../../../providers/validators';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-change-password',
    templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
    ngForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChangePasswordPage');
    }

    /** 
     * 创建表单 
     */    
    createForm() {
        this.ngForm = this.fb.group({
        old: ['',[Validators.required,Validators.minLength(6)]], 
        new: ['',[Validators.required,Validators.minLength(6)]],
        affirm: ['',[Validators.required,Validators.minLength(6)]], 
      },{updateOn: 'blur'});
    // this.ngForm = new FormGroup({
    //     old:new FormControl('',[Validators.required,Validators.minLength(6)]),
    //     new:new FormControl('',[Validators.required,Validators.minLength(6)]),
    //     affirm:new FormControl('',[Validators.required,Validators.minLength(6)]),
    // });
    }
    get old() { return this.ngForm.get('old'); }
    get new() { return this.ngForm.get('new'); }
    get affirm() { return this.ngForm.get('affirm'); }

    change() {
        console.log(this.ngForm);
        console.log('this.old',this.old);
        
    }
}
