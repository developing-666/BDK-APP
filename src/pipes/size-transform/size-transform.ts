import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SizeTransformPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'sizeTransform'
})
export class SizeTransformPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(value: number, ...args) {
        let size: string = '';
        if (value == 0) {
            return 0;
        }
        if (value < 0.1 * 1024) {
            //小于0.1KB，则转化成B
            size = value.toFixed(2) + 'B';
        } else if (value < 0.1 * 1024 * 1024) {
            //小于0.1MB，则转化成KB
            size = (value / 1024).toFixed(2) + 'KB';
        } else if (value < 0.1 * 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成MB
            size = (value / (1024 * 1024)).toFixed(2) + 'MB';
        } else {
            //其他转化成GB
            size = (value / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
        }

        let sizeStr = size + ''; //转成字符串
        let index = sizeStr.indexOf('.'); //获取小数点处的索引
        let dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        if (dou == '00') {
            //判断后两位是否为00，如果是则删除00
            return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        }
        return size;
    }
}
