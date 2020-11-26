import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  map,
  catchError,
  withLatestFrom,
  concatMap,
} from 'rxjs/operators';
import * as GitHubActions from './github.actions';

import { GithubService } from './../github-search.service';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { geItemsByPage, gePageIndex, getTextToFind } from './github.selectors';

@Injectable()
export class GitHubEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private githubService: GithubService
  ) {}

  $findUser = createEffect(() =>
    this.actions$.pipe(
      ofType(GitHubActions.searchUserGitHub),
      map((action) => action.textToFind),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.pipe(select(geItemsByPage))),
          withLatestFrom(this.store.pipe(select(gePageIndex)))
        )
      ),

      mergeMap(([textAndByPage, gePageIndex]) => {
        const [textToFind, geItemsByPage] = textAndByPage;

        return this.githubService
          .findByUser(textToFind, geItemsByPage, gePageIndex)
          .pipe(
            map((response) => {
              return GitHubActions.searchUserGitHubSuccess({
                users: response.items,
                total_count: response.total_count,
              });
            }),
            catchError((error: string) =>
              of(GitHubActions.searchUserGitHubFailure({ error }))
            )
          );
      })
    )
  );

  $changedPages = createEffect(() =>
    this.actions$.pipe(
      ofType(GitHubActions.setPageIndex),
      map((action) => action.index),
      concatMap((index) =>
        of(index).pipe(
          withLatestFrom(this.store.pipe(select(getTextToFind))),
          withLatestFrom(this.store.pipe(select(geItemsByPage)))
        )
      ),

      mergeMap(([textAndByPage, geItemsByPage]) => {
        const [gePageIndex, textToFind] = textAndByPage;

        return this.githubService
          .findByUser(textToFind, geItemsByPage, gePageIndex)
          .pipe(
            map((response) => {
              return GitHubActions.searchUserGitHubSuccess({
                users: response.items,
                total_count: response.total_count,
              });
            }),
            catchError((error: string) =>
              of(GitHubActions.searchUserGitHubFailure({ error }))
            )
          );
      })
    )
  );

  $changedItemByPage = createEffect(() =>
    this.actions$.pipe(
      ofType(GitHubActions.setItemsByPage),
      map((action) => action.byPage),
      concatMap((byPage) =>
        of(byPage).pipe(
          withLatestFrom(this.store.pipe(select(getTextToFind))),
          withLatestFrom(this.store.pipe(select(gePageIndex)))
        )
      ),

      mergeMap(([textAndByPage, gePageIndex]) => {
        const [geItemsByPage, textToFind] = textAndByPage;

        return this.githubService
          .findByUser(textToFind, geItemsByPage, gePageIndex)
          .pipe(
            map((response) => {
              return GitHubActions.searchUserGitHubSuccess({
                users: response.items,
                total_count: response.total_count,
              });
            }),
            catchError((error: string) =>
              of(GitHubActions.searchUserGitHubFailure({ error }))
            )
          );
      })
    )
  );
}
