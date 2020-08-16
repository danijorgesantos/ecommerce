import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectShoppingCartState } from '../root-store/auth-store/selectors';
import { AddProduct } from '../root-store/auth-store/actions';

@Injectable()
export class ProductPageFacade {
    selectedLoggedin$ = this.store.select(selectShoppingCartState);

    constructor(
        private store: Store<any>
        ) { }

    AddToBag(product) {
        this.store.dispatch(new AddProduct(product));
    }

}
