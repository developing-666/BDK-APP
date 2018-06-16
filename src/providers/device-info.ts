import { Injectable } from '@angular/core';

import { Device } from '@ionic-native/device';
@Injectable()
export class deviceInfo {
	constructor(
		private device: Device
	) { }
	
}
