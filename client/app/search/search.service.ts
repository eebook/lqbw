import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class GithubService {
  private searchString: string;
  // Don't worry, copy from elsewhere, not mine, 23333
  private clientId = '60b9f23dedffbdfc476c';
  private clientSecret = 'd1c186c6373f96571c0bfcf76b84e4dc6fd0c15a';
  private access_token = '2bee368c8ad1326b8c28fd9818b1cb5d4e34eadf';

  constructor(private _http: Http) {
    this.searchString = '';
  }

  getBooks() {
      if (this.searchString) {
          return this._http.get('/ajax/search/book?q=' + this.searchString)
            .map(res => res.json())
            .catch(this.handleError);
      }
  }

  private handleError(error: any) {
      if (error.status === 401) {
          return Observable.throw(error.status);
      } else {
          return Observable.throw(error.status || 'Server error');
      }
  }

  updateUser(userName: string) {
      this.searchString = userName;
  }
}
