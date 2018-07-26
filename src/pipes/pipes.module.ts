import { ModuleWithProviders, NgModule } from '@angular/core';
import { MapToIterable } from './map-to-iterable';
import { OrderBy } from './order-by';
import { TrustResourceUrl } from './bypass-trust-res-url';
import { FollowStatusPipe } from './follow-status/follow-status';
import { PhoneHideNumberPipe } from './phone-hide-number/phone-hide-number';
import { MomentPipe } from './moment/moment';
import { GetImgPipe } from './get-img/get-img';
import { SortNamePipe } from './sort-name/sort-name';
import { SizeTransformPipe } from './size-transform/size-transform';

export { MapToIterable } from './map-to-iterable';
export { OrderBy } from './order-by';
export { TrustResourceUrl } from './bypass-trust-res-url';

@NgModule({
    exports: [
        MapToIterable,
        OrderBy,
        TrustResourceUrl,
        FollowStatusPipe,
        MomentPipe,
        GetImgPipe,
        PhoneHideNumberPipe,
        SortNamePipe,
        SizeTransformPipe
    ],
    declarations: [
        MapToIterable,
        OrderBy,
        TrustResourceUrl,
        FollowStatusPipe,
        MomentPipe,
        GetImgPipe,
        PhoneHideNumberPipe,
        SortNamePipe,
        SizeTransformPipe
    ]
})
export class PipesModule {}
