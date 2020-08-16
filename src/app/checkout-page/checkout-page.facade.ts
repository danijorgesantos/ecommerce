import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectShoppingCartState } from '../root-store/auth-store/selectors';

@Injectable()
export class CheckoutPageFacade {
    selectedShoppingCart$ = this.store.select(selectShoppingCartState);

    constructor(
        private store: Store<any>
        ) { }
}
