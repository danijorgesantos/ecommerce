import { Actions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.USER_LOGIN: {
            return {
                ...state,
                loggedin: true
            };
        }
        case ActionTypes.ADD_PRODUCT: {
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload]
            };
        }
        default: {
            return state;
        }
    }
}
