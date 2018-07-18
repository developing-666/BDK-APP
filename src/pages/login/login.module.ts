import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoginPage } from './login/login';
import { SignInPage } from './sign-in/sign-in';
import { ForgetPasswordPage } from './forget-password/forget-password';
import { UserAgreementPage } from './user-agreement/user-agreement';
import { GuidePage } from './guide/guide';

@NgModule({
	imports: [IonicModule],
	declarations: [
		LoginPage,
		SignInPage,
		ForgetPasswordPage,
        UserAgreementPage,
        GuidePage,
	],
	entryComponents: [
		LoginPage,
		SignInPage,
		ForgetPasswordPage,
		UserAgreementPage,
        GuidePage,
	],
	providers: [],
	exports: [IonicModule]
})
export class LoginModule {
}
