import { Pipe, PipeTransform } from '@angular/core';



import { FOLLOWSTATUS } from '../../providers/constants';
@Pipe({
    name: 'followStatus'
})
export class FollowStatusPipe implements PipeTransform {
    transform(value: string) {
        let result: string = '';
        for (let item of FOLLOWSTATUS){
            if (value == item.value){
                result = item.label;
            }
        };
        return result;
    }
}
