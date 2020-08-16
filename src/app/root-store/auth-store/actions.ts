import { Action } from '@ngrx/store';

export enum ActionTypes {
    INCREMENT = '[Counter component] Increment',
    DECREMENT = '[Counter component] Decrement',
    RESET = '[Counter component] Reset',
    USER_LOGIN = '[Counter component] UserLoggedin',
    ADD_PRODUCT = '[Product-page component] AddProduct'
}

export class Increment implements Action {
    readonly type = ActionTypes.INCREMENT;
}

export class Decrement implements Action {
    readonly type = ActionTypes.DECREMENT;
}

export class Reset implements Action {
    readonly type = ActionTypes.RESET;
}

export class UserLogin implements Action {
    readonly type = ActionTypes.USER_LOGIN;
}

export class AddProduct implements Action {
    readonly type = ActionTypes.ADD_PRODUCT;
    constructor(public payload: { product: any }) {}
}

export type Actions = Increment | Decrement | Reset | UserLogin | AddProduct;

export const fromCounterActions = {
    Increment,
    Decrement,
    Reset,
    UserLogin,
    AddProduct
};
