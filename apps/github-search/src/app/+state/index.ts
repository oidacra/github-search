import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { InjectionToken } from '@angular/core';

// tslint:disable-next-line
export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    router: fromRouter.routerReducer,
  }),
});

export const metaReducers: MetaReducer<State>[] = [];
