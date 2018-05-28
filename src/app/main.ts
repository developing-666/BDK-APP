import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);



window.addEventListener('resize',function(){
	if(window.screen.width<=580){
		window.location.reload();
	}
},false);