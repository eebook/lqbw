import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpService} from './../common/http.service';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

@Injectable()
export class AboutService {
  constructor(private _http: Http) {}

  public getAbout(): Observable<Response> {
    return this._http.get('/ajax/about/');
  }
}
