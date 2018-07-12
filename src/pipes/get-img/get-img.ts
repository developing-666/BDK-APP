import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'getImg',
})
export class GetImgPipe implements PipeTransform {
	transform(value: string, size: string) {
		const index = value.lastIndexOf('.');
		const len = value.length;
		const path = value.substring(0, index);
		const suffix = value.substring(index, len);
		console.log(`${path}_-${size}${suffix}`);
		return `${path}_-${size}${suffix}`;
	}
}
