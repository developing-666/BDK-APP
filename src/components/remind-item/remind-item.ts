import { Component,Directive } from '@angular/core';

@Component({
	selector: 'remind-item',
	templateUrl: 'remind-item.html'
})

export class RemindItemComponent {

	text: string;

	constructor() {
		console.log('Hello RemindItemComponent Component');
		this.text = 'Hello World';
	}

}