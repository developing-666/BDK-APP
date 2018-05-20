import { Component } from '@angular/core';
import { NavController, ModalController,ActionSheetController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public actionSheetCtrl: ActionSheetController
	) { }
	presentProfileModal() {
		let myModal = this.modalCtrl.create(ContactPage);
		myModal.present();
		console.log(123123)
	}
	actionSheet(){
		let actionSheet = this.actionSheetCtrl.create({
	      buttons: [
	        {
	          text: 'Cancel',
	          role: 'cancel',
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        }
	      ]
	    });
	    actionSheet.present();
	}
}
