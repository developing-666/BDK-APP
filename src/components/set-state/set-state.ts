import { Component } from '@angular/core';

@Component({
	selector: 'set-state',
	templateUrl: 'set-state.html'
})
export class SetStateComponent {

	text: string;

	constructor() {
		console.log('Hello SetStateComponent Component');
		this.text = 'Hello World';
	}

}