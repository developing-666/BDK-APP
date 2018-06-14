import { Component,ElementRef,OnInit,OnDestroy } from '@angular/core';


@Component({
	selector: 'ion-audio',
	templateUrl: 'ion-audio.html'
})
export class IonAudioComponent implements OnInit,OnDestroy{
	Media:any = null;
	constructor(
		private $el:ElementRef
	) {}
	ngOnInit(){

	}
	ngOnDestroy(){

	}
	init(src) {
		this.Media = new Audio(src);

	}
}
