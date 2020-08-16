import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectCountState } from '../root-store/auth-store/selectors';
import { selectShoppingCartState } from '../root-store/auth-store/selectors';

import { UserLogin } from '../root-store/auth-store/actions';

@Injectable()
export class NavbarFacade {
    selectedLoggedin$ = this.store.select(selectCountState);
    selectedShoppingCart$ = this.store.select(selectShoppingCartState);

    constructor(
        private store: Store<any>
        ) { }

    Login() {
        this.store.dispatch(new UserLogin());
    }

    Logout() {
        this.store.dispatch(new UserLogin());
    }

}
