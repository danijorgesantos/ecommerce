import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<
  any
> = createEntityAdapter<any>({
  selectId: model => model.id,
  sortComparer: (a: any, b: any): number =>
    b.id.toString().localeCompare(a.id)
});

export interface State extends EntityState<any> {
  loggedin?: boolean;
  shoppingCart?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    loggedin: false,
    shoppingCart: []
  }
);
