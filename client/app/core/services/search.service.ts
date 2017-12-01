import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book, BookTmp } from '../../search/models/book';

@Injectable()
export class SearchBooksService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(queryTitle: string): Observable<BookTmp[]> {
    return this.http
      .get<{ results: BookTmp[] }>('/ajax/search/book?q=' + queryTitle)
      .map(books => books.results || []);
  }

  retrieveBook(volumeId: string): Observable<Book> {
    return this.http.get<Book>(`${this.API_PATH}/${volumeId}`);
  }
}
