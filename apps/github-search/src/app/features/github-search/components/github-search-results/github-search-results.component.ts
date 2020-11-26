import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IUsersGitHub } from '../../models/user.github.model';

@Component({
  selector: 'github-search-results',
  templateUrl: './github-search-results.component.html',
  styleUrls: ['./github-search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubSearchResultsComponent {
  @Input()
  users: IUsersGitHub[];

  @Input()
  total_count: number;

  @Input()
  isLoading: boolean;

  @Input()
  pageSize: number;

  @Input()
  pageIndex: number;

  @Output()
  currentPageIndex = new EventEmitter<number>();

  @Output()
  itemsByPage = new EventEmitter<number>();
  test = true;
  nzPageIndexChange(pageNumber) {
    this.currentPageIndex.emit(pageNumber);
  }
  nzPageSizeChange(sizeByPage) {
    this.itemsByPage.emit(sizeByPage);
  }
}
