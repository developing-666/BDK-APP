import { Utils } from './../../providers/utils';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'getImg',
})
export class GetImgPipe implements PipeTransform {
	transform(value: string, size: string) {
        return Utils.getPicUrl(value,size);
	}
}
