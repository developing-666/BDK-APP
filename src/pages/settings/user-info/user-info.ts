import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup  } from '@angular/forms';

import { Validators } from "../../../providers/validators";
/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-user-info',
	templateUrl: 'user-info.html',
})
export class UserInfoPage {
    ngForm: FormGroup;
    canEdit:boolean = false;
	constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private fb: FormBuilder,
    ) {
        this.createForm();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserInfoPage');
    }

    /** 
     * 创建表单 
     */    
    createForm() {
        this.ngForm = this.fb.group({
        name:  ['', Validators.required], 
        phone: ['',[Validators.phone,Validators.required]],
        work: ['', Validators.required], 
      },
      { updateOn: 'blur' });

    }

    change() {
        console.log(this.ngForm);
    }

    click() {
        console.log(1111);
        
    }

    /** 
     * 点击编辑按钮 
     */    
    clickEditButton() {
        this.canEdit = !this.canEdit;
    }

}
