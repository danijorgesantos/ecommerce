import { Actions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.INCREMENT: {
            return {
                ...state,
                count: state.count + 1
            };
        }
        case ActionTypes.DECREMENT: {
            return {
                ...state,
                count: state.count - 1
            };
        }
        case ActionTypes.RESET: {
            return {
                ...state,
                count: 0
            };
        }
        // case ActionTypes.LOAD_SUCCESS: {
        //     return featureAdapter.addAll(action.payload.items, {
        //         ...state,
        //         isLoading: false,
        //         error: null
        //     });
        // }
        default: {
            return state;
        }
    }
}
