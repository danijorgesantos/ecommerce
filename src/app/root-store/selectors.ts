import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
    AuthStoreSelectors
} from './auth-store';

// export const selectError: MemoizedSelector<object, string> = createSelector(
//     AuthStoreSelectors.selectJokeError,
//     (jokeError: string) => {
//         return jokeError;
//     }
// );

// export const selectIsLoading: MemoizedSelector<
//     object,
//     boolean
// > = createSelector(
//     AuthStoreSelectors.selectJokeIsLoading,
//     (joke: boolean) => {
//         return joke;
//     }
// );
