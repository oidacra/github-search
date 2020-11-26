import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'github-search-input',
  templateUrl: './github-search-input.component.html',
  styleUrls: ['./github-search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubSearchInputComponent {
  @Input()
  title: string;

  @Input()
  isLoading: boolean;

  @Output()
  textToFind = new EventEmitter<string>();

  inputValue = '';

  find() {
    this.textToFind.emit(this.inputValue);
  }
  clearInput() {
    this.inputValue = '';
  }
}
