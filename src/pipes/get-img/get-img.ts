import { Utils } from './../../providers/utils';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'getImg',
})
export class GetImgPipe implements PipeTransform {
	transform(value: string, size: string) {
		if (value.indexOf('base64') > -1) {
			return value;
		} else {
            return Utils.getPicUrl(value);;
		}
	}
}
