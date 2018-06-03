import { Component, Output, EventEmitter, OnInit,ApplicationRef } from '@angular/core';

import { Keyboard } from '@ionic-native/keyboard';

@Component({
	selector: 'ion-input-panel',
	templateUrl: 'ion-input-panel.html'
})
export class IonInputPanelComponent implements OnInit {
	@Output() textInput: EventEmitter<any> = new EventEmitter();
	@Output() recordInput: EventEmitter<any> = new EventEmitter();
	@Output() deleteClick: EventEmitter<any> = new EventEmitter();
	@Output() playClick: EventEmitter<any> = new EventEmitter();
	isRecord: boolean = false;
	panelOpen: boolean = false;
	complete: boolean = false;
	seconds: number = 0;
	clock: any = null;
	recording: boolean = false;
	playing: boolean = false;
	keyboardHeight: number = 0;
	panelStyle: any = {};
	keyboardShow:any = null;
	keyboardHide:any = null;
	constructor(
		private applicationRef : ApplicationRef,
		private keyboard: Keyboard
	) {
		console.log('Hello IonInputPanelComponent Component');
	}
	ngOnInit() {
		this.keyboardShow = this.keyboard.onKeyboardShow().subscribe((e) => {
			this.keyboardHeight = e.keyboardHeight;
			this.panelStyle = {
				transform: `translateY(-${e.keyboardHeight}px)`
			}
			this.applicationRef.tick();
			console.log(this.panelStyle);
		});
		this.keyboardHide = this.keyboard.onKeyboardHide().subscribe((e) => {
			this.panelStyle = {};
			this.applicationRef.tick();
		});
	}
	ngOnDestroy() {
		this.keyboardShow.unsubscribe();
		this.keyboardHide.unsubscribe();
	}
	open() {
		this.panelOpen = !this.panelOpen;
	}
	text(e) {
		this.isRecord = false;
		this.textInput.emit(e);
	}
	inputFoucs() {
		this.isRecord = false;
		this.panelOpen = true;
	}
	record(e) {
		this.isRecord = true;
		this.panelOpen = true;
		this.recordInput.emit(e);
	}
	play(e) {
		this.playClick.emit(e);
	}
	delete(e) {
		this.complete = false;
		this.deleteClick.emit(e);
	}
	clockStart() {
		this.seconds = 0;
		this.recording = true;
		console.log(this.seconds);
		this.clock = setInterval(() => {
			this.seconds++;
			console.log(this.seconds);
		}, 1000);
	}
	clockStop() {
		this.recording = false;
		clearInterval(this.clock);
		this.complete = true;
		// if (this.seconds<2){
		//     alert('录音时间太短');
		// }else{
		//     this.complete = true;
		// }
		console.log(this.seconds);
	}
}
