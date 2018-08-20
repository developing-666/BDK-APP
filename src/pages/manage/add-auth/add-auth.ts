import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams,Events } from 'ionic-angular';

import { AuthTagPage } from '../auth-tag/auth-tag';
import { CustomTagPage } from '../../clientele/custom-tag/custom-tag';

import { AppApi } from '../../../providers/app-api';



@Component({
	selector: 'page-add-auth',
	templateUrl: 'add-auth.html'
})
export class AddAuthPage {
	@ViewChild('addAuthForm') addAuthForm: NgForm;
	type: string = this.navParams.get('type');
	labelsString: string = '';
	formData: any = {
		phone: undefined,
		name: undefined,
		roleId: undefined,
		labels: undefined,
	};
	role:string = '';
	city: Array<any> = [];
	submitIng: boolean = false;
	submitted: boolean = false;
	interval: any;
	time: number = 60;
	labelsUpdate: any = (d) => {
		console.log(d);

	};
	roleUpdate: any = (d) => {
		console.log(d);
		this.formData.roleId = d.id;
		this.role = d.name;
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private events: Events,
	) { }

	ionViewDidLoad() {
		this.events.subscribe('tag:authTag', this.roleUpdate);
		this.events.subscribe('tag:customTag', this.labelsUpdate);
	}
	ionViewWillUnload() {
		this.events.subscribe('tag:authTag', this.roleUpdate);
		this.events.subscribe('tag:customTag', this.labelsUpdate);
	}
	authTag() {
		this.navCtrl.push(AuthTagPage, {
            tag: {
				id:this.formData.roleId
			}
        });
	}
	customTag() {
        this.navCtrl.push(CustomTagPage, {
            tag: this.formData.labels
        });
	}
	add() {
		this.submitted = true;
		if (this.addAuthForm.valid) {

		}
	}
	getCode() {
		this.appApi.getCode(this.formData.phone).subscribe(d => {
			this.interval = setInterval(() => {
				this.time > 0 ? this.time-- : this.countDownEnd();
			}, 1000);
		});
	}
	countDownEnd() {
		clearInterval(this.interval);
		this.time = 60;
	}
}
