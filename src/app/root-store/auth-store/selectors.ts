import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<any>('auth');

export const selectCountState = createSelector(
    selectAuthState,
    (state: any) => state.auth
);
