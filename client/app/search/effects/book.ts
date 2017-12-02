import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';

// rxjs
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
// import {
//   catchError,
//   debounceTime,
//   distinctUntilChanged,
//   map,
//   skip,
//   switchMap,
//   takeUntil,
// } from 'rxjs/operators';

import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
// import { of } from 'rxjs/observable/of';
// import { takeUntil } from 'rxjs/add/observable'

import { SearchBooksService } from '../../core/services/search.service';
import * as book from '../actions/book';
import { Book, BookTmp } from '../models/book';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);


@Injectable()
export class BookEffects {
  @Effect()
  search$: Observable<Action> = this._actions$
    .ofType<book.Search>(book.SEARCH)
    // .debounceTime(this.debounce, this.scheduler || async)
    .map(action => action.payload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }
      console.log('query string???', query)

      const nextSearch$ = this._actions$.ofType(book.SEARCH).skip(1);

      return this._searchBooks
        .searchBooks(query)
        .takeUntil(nextSearch$)
        .map((bookstmp: BookTmp[]) => new book.SearchComplete(bookstmp))
        .catch(err => of(new book.SearchError(err)));
    });

  constructor(
    private _actions$: Actions,
    private _searchBooks: SearchBooksService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number = 300,
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
