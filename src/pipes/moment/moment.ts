import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';
moment.locale('zh-cn');
@Pipe({
	name: 'moment',
})
export class MomentPipe implements PipeTransform {
	transform(value: string, ...args) {
		if (value) {
			return moment(value).format(args[0]);
		} else {
			return '';
		}
	}
}
