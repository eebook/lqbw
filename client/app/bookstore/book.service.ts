import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService} from './../common/http.service';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

@Injectable()
export class BookService {
  constructor(private http: Http) {}

  public getBookDetail(bookUUID): Observable<Response> {
    console.log('Get book detail');
    return this.http.get('/ajax/book/detail/' + bookUUID);
  }
}
