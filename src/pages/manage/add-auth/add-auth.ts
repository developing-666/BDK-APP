import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-add-auth',
    templateUrl: 'add-auth.html'
})
export class AddAuthPage {
    @ViewChild('addAuthForm') addAuthForm: NgForm;
    type: string = this.navParams.get('type');
    labelsString: string = '';
    formData:any = {
        phone:undefined,
        name:undefined,
        label:undefined,
        labels:undefined,

    };
    city:Array<any> = [];
    submitIng: boolean = false;
    submitted:boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddAuthPage');
    }
    authTag(){

    }
    customTag(){

    }
    add(){
        this.submitted = true;
        if(this.addAuthForm.valid){

        }
    }
    getCode(){
        
    }
}
