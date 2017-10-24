import { MatDialog } from '@angular/material';
import { SignInUpComponent } from './../shared/modal/sign-in-up/sign-in-up.component';
import { AuthService } from './../common/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/model/user-model';
import { CovalentSearchModule } from '@covalent/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  routes: Object[] = [{
    title: 'Home',
    route: '/',
    icon: 'dashboard',
  }, {
    title: 'Bookstore',
    route: '/bookstore',
    icon: 'view_quilt',
  }, {
    title: 'Jobs',
    route: '/job',
    icon: 'receipt',
  }, {
    title: 'Settings',
    route: '/settings',
    icon: 'people',
  }, {
    title: 'About',
    route: '/about',
    icon: 'info'
  }];
  public currentUser: User;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.currentUser) {
      console.log('currentUser is None');
    } else {
      console.log('currentUser: ' + this.currentUser.userName);
    }
  }

  public doLogout(): void {
    this._authService.logout();
    // TODO: pop up messages
    this._router.navigate(['bookstore']);
  }

  ShowRegisterDialog() {
    if (this.dialog.afterOpen) {
      this.dialog.closeAll();
    }
    const dialogRefRegister = this.dialog.open(SignInUpComponent);
    dialogRefRegister.afterClosed().subscribe(result => {});
  }
}
