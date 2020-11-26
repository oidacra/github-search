import { IProfileGitHub } from './../models/user.github.model';
import { createAction, props } from '@ngrx/store';

export const searchUserGitHub = createAction(
  '[GitHub] Search user',
  props<{ textToFind: string }>()
);

export const searchUserGitHubSuccess = createAction(
  '[GitHub] Search user Success',
  props<{ users: IProfileGitHub[]; total_count: number }>()
);

export const searchUserGitHubFailure = createAction(
  '[GitHub] Search user Failure',
  props<{ error: string }>()
);

// Pagination
export const setItemsByPage = createAction(
  '[Pagination] Change items by page',
  props<{ byPage: string }>()
);
export const setPageIndex = createAction(
  '[Pagination] Change page index',
  props<{ index: string }>()
);
