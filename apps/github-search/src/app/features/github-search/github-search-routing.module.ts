import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubSearchPageComponent } from './page/github-search-page.component';

const routes: Routes = [{ path: '', component: GithubSearchPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubSearchRoutingModule {}
