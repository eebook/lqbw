// import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromBooks from '../../reducers';
import * as BookActions from '../../actions/book';
import { Book, } from '../../models/book';

@Component({
  selector: 'app-search-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html'
})
export class SearchBookComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromBooks.State>) {
    this.searchQuery$ = store.select(fromBooks.getSearchQuery).take(1);
    this.books$ = store.select(fromBooks.getSearchResults);
    this.loading$ = store.select(fromBooks.getSearchLoading);
    this.error$ = store.select(fromBooks.getSearchError);
  }

  search(query: string) {
    this.store.dispatch(new BookActions.Search(query));
  }
}
