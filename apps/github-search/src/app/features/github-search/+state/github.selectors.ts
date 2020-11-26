import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GITHUB_FEATURE_KEY,
  GithubState,
  GitHubPartialState,
} from './github.reducer';

export const getGithubState = createFeatureSelector<
  GitHubPartialState,
  GithubState
>(GITHUB_FEATURE_KEY);

export const getUsers = createSelector(
  getGithubState,
  (state: GithubState) => state.users
);

export const getGitHubError = createSelector(
  getGithubState,
  (state: GithubState) => state.error
);

export const isLoading = createSelector(
  getGithubState,
  (state: GithubState) => state.isLoading
);
export const getTotalCount = createSelector(
  getGithubState,
  (state: GithubState) => state.totalCount
);
export const getTextToFind = createSelector(
  getGithubState,
  (state: GithubState) => state.textToFind
);
// Pagination
export const geItemsByPage = createSelector(
  getGithubState,
  (state: GithubState) => state.itemsByPage
);
export const gePageIndex = createSelector(
  getGithubState,
  (state: GithubState) => state.pageIndex
);
