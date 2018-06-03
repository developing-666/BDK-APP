import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


import { Keyboard } from '@ionic-native/keyboard';
@Component({
    selector: 'info-input',
    templateUrl: 'info-input.html'
})
export class InfoInputComponent {
    @ViewChild('remarkInput') remarkInput: ElementRef;
    @Output() inputClick: EventEmitter<any> = new EventEmitter();

    constructor(
        private keyboard: Keyboard
    ) {}
    textareaClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.inputClick.emit(e);
        this.keyboard.hideKeyboardAccessoryBar(true);
        console.log(e);
    }
    blur() {
        this.remarkInput.nativeElement.blur();
    }
}
