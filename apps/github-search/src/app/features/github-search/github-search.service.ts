import { IGitHubResponse, IProfileGitHub } from './models/user.github.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { geItemsByPage, gePageIndex } from './+state/github.selectors';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  url = 'https://api.github.com/search/users';

  geItemsByPage$ = this.store.select(geItemsByPage);
  gePageIndex$ = this.store.select(gePageIndex);

  constructor(private http: HttpClient, private store: Store) {}

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
        map((perfiles) => ({ items: perfiles, total_count: total_count }))
      );
  }
}
