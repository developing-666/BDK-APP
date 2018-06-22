

import { Injectable } from '@angular/core';
import { AbstractControl, Validators as angularValidators } from '@angular/forms';

@Injectable()
export class Validators extends angularValidators {

	/*E-mail*/
	static email = (control: AbstractControl) => {
		return Validators.validatorsByPattern('email', control, '([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?');
	}

	/*手机号码*/
	static phone = (control: AbstractControl) => {
		return Validators.validatorsByPattern('phone', control, '(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}');
	}

	/*中文*/
	static chinese = (control: AbstractControl) => {
		return Validators.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
	}

	/*英文、数字包括下划线*/
	static legallyNamed = (control: AbstractControl) => {
		return Validators.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9_]+');
	}

	private static validatorsByPattern = (name: string, control: AbstractControl, pattern: string) => {
		const validatorFn = Validators.pattern(pattern)(control);
		if (validatorFn != null) {
			validatorFn[name] = validatorFn['pattern'];
		}
		return validatorFn;
	}
}
