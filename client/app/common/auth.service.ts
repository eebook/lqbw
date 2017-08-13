import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  public logout(): void {
      localStorage.removeItem('currentUser');
      this.http.request('/ajax/auth/logout', {
          method: 'get'
      }).then(({ result }) => {
          console.log('Logout result: ', result);
      }).catch(errors => {
          if (errors instanceof Array) {
              console.log(errors);
          }
      }).then(() => {
          console.log('WTF is this');
      });
  }
}
