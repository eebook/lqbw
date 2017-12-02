import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Book, BookTmp } from '../../search/models/book';

@Injectable()
export class SearchBooksService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  constructor(
    // private http: HttpClient
    private http: Http,
  ) {}

  searchBooks(queryTitle: string): Observable<BookTmp[]> {
    // return this.http
      // .get<{ results: BookTmp[] }>('/ajax/search/book?q=' + queryTitle)
      return this.http.get('/ajax/search/book?q=' + queryTitle)
      .map(books => books.json().results || []);
  }

}
