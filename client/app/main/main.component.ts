import { MatDialog } from '@angular/material';
import { SignInUpComponent } from './../shared/modal/sign-in-up/sign-in-up.component';
import { AuthService } from './../common/auth.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user/model/user-model';
import { CovalentSearchModule } from '@covalent/core';
// import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentInit {
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
  returnUrl: string;

  // param = {value: 'world'};

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    // private translate: TranslateService
  ) {
    // translate.setDefaultLang('en');
    // translate.use('en');
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.currentUser) {
      console.log('currentUser is None');
    } else {
      console.log('currentUser: ' + this.currentUser.userName);
    }
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    console.log('returnUrl???' + this.returnUrl);
  }

  public ngAfterContentInit() {
    // https://github.com/angular/angular/issues/10762
    // let modalFactory = this.componentResolver.resolveComponentFactory(<any>this.dialog.config.content);
    // this.componentInstance = this.container.createComponent(modalFactory, null, this.injector);
    if (this.returnUrl !== '/') {
      this.signInUpDialog();
    }
  }

  public doLogout(layout): void {
    this._authService.logout();
    this.currentUser = null;
    // TODO: pop up messages
    layout.close();
    this._router.navigate(['']);
  }

  signInUpDialog() {
    if (this.dialog.afterOpen) {
      this.dialog.closeAll();
    }
    const dialogRefRegister = this.dialog.open(SignInUpComponent);
    dialogRefRegister.afterClosed().subscribe(result => {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

  // changeLang(lang: string): void {
  //   localStorage.setItem('lang', lang);
  //   window.location.reload();
  // }
}
