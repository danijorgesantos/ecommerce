import { createSelector, createFeatureSelector, State } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<any>('auth');

export const selectCountState = createSelector(
    selectAuthState,
    (state: any) => state.auth
);

// export const selectShoppingCartState = createSelector(
//     selectAuthState,
//     (state: any) => state.auth
// );



export const selectFeature = (state: any) => state.auth;

export const selectShoppingCartState = createSelector(
  selectFeature,
  (state: any) => state.shoppingCart
);
