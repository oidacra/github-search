import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from './../../shared/shared.module';
import { GithubSearchPageComponent } from './page/github-search-page.component';
import * as fromGithub from './+state/github.reducer';
import { GitHubEffects } from './+state/github.effects';
import { NgZorroModule } from '../../shared/ng-zorro.module';

import { GithubSearchUserCardComponent } from './components/github-search-user-card/github-search-user-card.component';
import { GithubSearchInputComponent } from './components/github-search-input/github-search-input.component';
import { GithubSearchResultsComponent } from './components/github-search-results/github-search-results.component';
import { GithubService } from './github-search.service';
import { GithubSearchRoutingModule } from './github-search-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '../../shared/interceptors/http-error.interceptor';
@NgModule({
  declarations: [
    GithubSearchPageComponent,
    GithubSearchUserCardComponent,
    GithubSearchInputComponent,
    GithubSearchResultsComponent,
  ],
  imports: [
    SharedModule,
    NgZorroModule,
    GithubSearchRoutingModule,
    StoreModule.forFeature(fromGithub.GITHUB_FEATURE_KEY, fromGithub.reducer),
    EffectsModule.forFeature([GitHubEffects]),
  ],
  providers: [
    GithubService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class GithubSearchModule {}
