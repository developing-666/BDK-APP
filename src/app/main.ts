import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

let windowWidth = window.innerWidth;
window.addEventListener(
    'resize',
    function(e) {
        console.log(e);
        if (window.innerWidth < windowWidth && window.innerWidth <= 580) {
            windowWidth = window.innerWidth;
            window.location.reload();
        }
    },
    false
);
