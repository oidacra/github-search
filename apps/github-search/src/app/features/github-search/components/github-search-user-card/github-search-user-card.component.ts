import { IProfileGitHub } from './../../models/user.github.model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'github-search-card',
  templateUrl: './github-search-user-card.component.html',
  styleUrls: ['./github-search-user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubSearchUserCardComponent {
  @Input()
  user: IProfileGitHub;
}
