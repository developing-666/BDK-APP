import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
    selector: "page-setting-record",
    templateUrl: "setting-record.html"
})
export class SettingRecordPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {}

    ionViewDidLoad() {
        console.log("ionViewDidLoad SettingRecordPage");
    }
}
