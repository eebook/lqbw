import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

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
        console.log('logout, WTF is this');
    });
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
