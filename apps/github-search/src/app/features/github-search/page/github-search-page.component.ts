import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import {
  searchUserGitHub,
  setItemsByPage,
  setPageIndex,
} from '../+state/github.actions';
import {
  geItemsByPage,
  gePageIndex,
  getTotalCount,
  getUsers,
  isLoading,
} from '../+state/github.selectors';

import { GithubService } from './../github-search.service';
@Component({
  selector: 'github-search-page',
  template: `<nz-layout>
    <nz-layout>
      <nz-content
        ><div nz-row nzJustify="center" class="inner-container">
          <div nz-col nzSpan="18">
            <github-search-input
              [title]="'Github users finder'"
              [isLoading]="isLoading$ | async"
              (textToFind)="findUser($event)"
            >
            </github-search-input>
            <nz-divider></nz-divider>
          </div>

          <div nz-col nzSpan="18">
            <github-search-results
              [users]="items$ | async"
              [isLoading]="isLoading$ | async"
              [pageSize]="itemsByPage$ | async"
              [pageIndex]="currentPage$ | async"
              [total_count]="total_count$ | async"
              (itemsByPage)="changeItemsByPage($event)"
              (currentPageIndex)="changePageIndex($event)"
            ></github-search-results>
          </div></div
      ></nz-content>
    </nz-layout>
  </nz-layout> `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      nz-layout {
        padding-top: 24px;
      }
    `,
  ],
})
export class GithubSearchPageComponent {
  items$ = this.store.select(getUsers);

  total_count$ = this.store.select(getTotalCount);
  isLoading$ = this.store.select(isLoading);

  itemsByPage$ = this.store.select(geItemsByPage);
  currentPage$ = this.store.select(gePageIndex);

  constructor(private store: Store, private githubService: GithubService) {}

  findUser(textToFind: string) {
    this.store.dispatch(searchUserGitHub({ textToFind }));
  }
  changeItemsByPage(byPage: string) {
    this.store.dispatch(setItemsByPage({ byPage }));
  }
  changePageIndex(index: string) {
    this.store.dispatch(setPageIndex({ index }));
  }
}
