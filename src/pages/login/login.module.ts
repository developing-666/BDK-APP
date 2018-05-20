import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoginPage } from './login/login';
import { SignInPage } from './sign-in/sign-in';

@NgModule({
	imports: [IonicModule],
	declarations: [
		LoginPage,
		SignInPage
	],
	entryComponents: [
		LoginPage,
		SignInPage
	],
	providers: [],
	exports: [IonicModule]
})
export class LoginModule {
}
