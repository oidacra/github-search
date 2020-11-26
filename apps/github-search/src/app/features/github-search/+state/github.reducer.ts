import { IProfileGitHub } from './../models/user.github.model';
import { createReducer, on, Action } from '@ngrx/store';

import * as GitHubActions from './github.actions';

export const GITHUB_FEATURE_KEY = 'github';

export interface GithubState {
  isLoading: boolean;
  users: IProfileGitHub[];
  totalCount: number;
  itemsByPage: string;
  pageIndex: string;
  error?: string | null;
  textToFind?: string;
}

export interface GitHubPartialState {
  readonly [GITHUB_FEATURE_KEY]: GithubState;
}

export const initialState: GithubState = {
  isLoading: false,
  itemsByPage: '12',
  pageIndex: '1',
  users: [],
  totalCount: 0,
  textToFind: '',
};

const githubReducer = createReducer(
  initialState,
  on(GitHubActions.searchUserGitHub, (state, action) => ({
    ...state,
    textToFind: action.textToFind,
    isLoading: true,
    error: null,
  })),

  on(GitHubActions.searchUserGitHubSuccess, (state, action) => ({
    ...state,
    users: action.users,
    totalCount: action.total_count,
    isLoading: false,
    error: null,
  })),
  on(GitHubActions.searchUserGitHubFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  // Pagination
  on(GitHubActions.setItemsByPage, (state, action) => ({
    ...state,
    isLoading: true,
    itemsByPage: action.byPage,
  })),
  on(GitHubActions.setPageIndex, (state, action) => ({
    ...state,
    isLoading: true,
    pageIndex: action.index,
  }))
);

export function reducer(state: GithubState | undefined, action: Action) {
  return githubReducer(state, action);
}
