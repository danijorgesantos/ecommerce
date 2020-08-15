import { Action } from '@ngrx/store';

export enum ActionTypes {
    INCREMENT = '[Counter component] Increment',
    DECREMENT = '[Counter component] Decrement',
    RESET = '[Counter component] Reset'
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

export type Actions = Increment | Decrement | Reset;

export const fromCounterActions = {
    Increment,
    Decrement,
    Reset
};
