import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectCountState } from '../root-store/auth-store/selectors';
import { UserLogin } from '../root-store/auth-store/actions';

@Injectable()
export class LoginFacade {
    selectedLoggedin$ = this.store.select(selectCountState);

    constructor(
        private store: Store<any>
        ) { }

    Login() {
        this.store.dispatch(new UserLogin());
    }
}
