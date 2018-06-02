import { Component, Output, EventEmitter } from '@angular/core';

import { Keyboard } from '@ionic-native/keyboard';

@Component({
    selector: 'ion-input-panel',
    templateUrl: 'ion-input-panel.html'
})
export class IonInputPanelComponent {
    @Output() textInput: EventEmitter<any> = new EventEmitter();
    @Output() recordInput: EventEmitter<any> = new EventEmitter();
    @Output() deleteClick: EventEmitter<any> = new EventEmitter();
    @Output() playClick: EventEmitter<any> = new EventEmitter();
    isRecord: boolean = false;
    panelOpen: boolean = true;
    complete: boolean = false;
    seconds: number = 0;
    clock: any = null;
    recording: boolean = false;
    playing: boolean = false;
    constructor(private keyboard: Keyboard) {
        console.log('Hello IonInputPanelComponent Component');
    }
    open() {
        this.panelOpen = !this.panelOpen;
    }
    text(e) {
        this.isRecord = false;
        this.keyboard.show();
        this.textInput.emit(e);
    }
    record(e) {
        this.isRecord = true;
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
