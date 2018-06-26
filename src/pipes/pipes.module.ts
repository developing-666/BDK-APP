import { ModuleWithProviders, NgModule } from '@angular/core';
import { MapToIterable } from './map-to-iterable';
import { OrderBy } from './order-by';
import { TrustResourceUrl } from './bypass-trust-res-url';
import { FollowStatusPipe } from './follow-status/follow-status';

export { MapToIterable } from './map-to-iterable';
export { OrderBy } from './order-by';
export { TrustResourceUrl } from './bypass-trust-res-url';

@NgModule({
	exports: [
		MapToIterable,
		OrderBy,
		TrustResourceUrl,
        FollowStatusPipe
	],
	declarations: [
		MapToIterable,
		OrderBy,
		TrustResourceUrl,
        FollowStatusPipe
	]
})
export class PipesModule {}
