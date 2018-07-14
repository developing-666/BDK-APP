import { Pipe, PipeTransform } from '@angular/core';



import { FOLLOWSTATUS } from '../../providers/constants';
@Pipe({
    name: 'followStatus'
})
export class FollowStatusPipe implements PipeTransform {
    transform(value: string,need:string) {
        let result: any = {
            class: value?value.toLowerCase():''
        };
        for (let item of FOLLOWSTATUS){
            if (value == item.value){
                result.state = item.label;
            }
        };
        return result[need];
    }
}
