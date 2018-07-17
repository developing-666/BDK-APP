import { Pipe, PipeTransform } from '@angular/core';

import { FILTERDATA } from '../../providers/constants';
@Pipe({
	name: 'sortName',
})
export class SortNamePipe implements PipeTransform {
	transform(value: string, ...args) {
		let result: string = '';
        for (let item of FILTERDATA[2].options){
            if (value == item.value){
                result = item.label;
            }
        };
        return result;
	}
}
