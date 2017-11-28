import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BookTmp } from './../../../bookstore/model/book-model';
import * as fromBooks from '../../reducers';
import * as book from '../../actions/book';

@Component({
  selector: 'app-searchtmp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html'
})
export class SearchtmpComponent {
  searchQuery$: Observable<string>;
  books$: Observable<BookTmp[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromBooks.State>) {
    // this.searchQuery$ = store.select(fromBooks.getSearchQuery);//.take(1);
    // this.searchQuery$ = store.select(fromBooks.getSearchQuery).take(1);
    this.books$ = store.select(fromBooks.getSearchResults);
    this.loading$ = store.select(fromBooks.getSearchLoading);
    this.error$ = store.select(fromBooks.getSearchError);
  }

  search(query: string) {
    console.log('query string?????', query);
    this.store.dispatch(new book.Search(query));
  }
}
