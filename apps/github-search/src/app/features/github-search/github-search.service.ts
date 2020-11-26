import {
  IGitHubResponse,
  IProfileGitHub,
  IUsersGitHub,
} from './models/user.github.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  concatMap,
  flatMap,
  map,
  mapTo,
  mergeMap,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { geItemsByPage, gePageIndex } from './+state/github.selectors';
import { forkJoin, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  url = 'https://api.github.com/search/users';

  geItemsByPage$ = this.store.select(geItemsByPage);
  gePageIndex$ = this.store.select(gePageIndex);

  /*  users$ = combineLatest([
    this.textToFind$,
    this.itemsByPage$,
    this.currentPage$,
  ]).pipe(
    map(([textToFind, itemsByPage, currentPage]) => {
      console.log(textToFind);
      console.log(itemsByPage);
      console.log(currentPage);
      return true;
    }),
    shareReplay(1)
  ); */

  constructor(private http: HttpClient, private store: Store) {}

  /* findByUser(q: string, per_page?: string, page?: string) {
    let params = new HttpParams();
    params = q ? params.append('q', q) : params;
    params = params.append('per_page', per_page);
    params = params.append('page', page);

    return this.http
      .get<IGitHubResponse>(this.url, { params })
      .pipe(
        map((response) => {
          let userProfile;
          response.items.map((user) => {
            return this.http
              .get(`https://api.github.com/users/${user.login}`)
              .subscribe((res: IProfileGitHub) => {
                userProfile = {
                  name: res.name,
                  bio: res.bio,
                  followers: res.followers,
                  following: res.following,
                  twitter_username: res.twitter_username,
                };
              });
          });
          console.log(userProfile);
          return { users: response.items, total_count: response.total_count };
        })
      );
  } */

  findByUser(q: string, per_page?: string, page?: string) {
    let params = new HttpParams();
    params = q ? params.append('q', q) : params;
    params = params.append('per_page', per_page);
    params = params.append('page', page);

    let total_count;
    return this.http
      .get<IGitHubResponse>(this.url, { params })
      .pipe(
        switchMap((resp) => {
          total_count = resp.total_count;

          return forkJoin(
            resp.items.map((item) => this.http.get<IProfileGitHub>(item.url))
          );
        }),
        map((perfiles) => {
          console.log(perfiles);
          return { items: perfiles, total_count: total_count };
        })
      );
  }
}
