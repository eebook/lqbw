import { Action } from '@ngrx/store';
import { BookTmp } from '../../bookstore/model/book-model';


export const SEARCH = '[Book] Search';
export const SEARCH_COMPLETE = '[Book] Search Complete';
export const SEARCH_ERROR = '[Book] Search Error';
export const LOAD = '[Book] load';

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: BookTmp[]) {}
}

export class SearchError implements Action {
  readonly type = SEARCH_ERROR;

  constructor(public payload: string) {}
}


export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: BookTmp) {}
}


export type Actions = Search | SearchComplete | SearchError | Load ;

