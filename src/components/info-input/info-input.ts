import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'info-input',
    templateUrl: 'info-input.html'
})
export class InfoInputComponent {
    @ViewChild('remarkInput') remarkInput: ElementRef;
    @Output() inputClick: EventEmitter<any> = new EventEmitter();

    constructor() {
        console.log('Hello InfoInputComponent Component');
    }
    textareaClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.inputClick.emit(e);
        console.log(e);
    }
    blur() {
        this.remarkInput.nativeElement.blur();
    }
}
