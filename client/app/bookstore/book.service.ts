import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService} from './../common/http.service';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

@Injectable()
export class BookService {
  constructor(private _http: Http) {}

  public getBookList(): Observable<Response> {
    return this._http.get('/ajax/books/')
  }

  public getBookDetail(bookUUID): Observable<Response> {
    return this._http.get('/ajax/books/detail/' + bookUUID);
  }

  public deleteABook(bookUUID): Observable<Response> {
    return this._http.delete('/ajax/books/detail/' + bookUUID);
  }

  public makeBookPublic(bookUUID): Observable<Response> {
    return this._http.put('/ajax/books/detail/' + bookUUID, {"is_public": true});
  }

  public makeBookPrivate(bookUUID): Observable<Response> {
    return this._http.put('/ajax/books/detail/' + bookUUID, {"is_public": false});
  }
}
