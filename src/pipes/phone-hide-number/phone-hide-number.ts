import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PhoneHideNumberPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'phoneHideNumber',
})
export class PhoneHideNumberPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let phone:String = '';
      if (value) {
        phone = value.substr(0,3) + '****' + value.substr(7,4);
      }
    return phone;
  }
}
