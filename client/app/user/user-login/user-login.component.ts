import { Component, OnInit, Input, Injector } from '@angular/core';
import { Http, Response} from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FieldBase, Textbox, Image } from './../../common/dynamic-form/form-field';
import { fadeIn } from './../../animations/fade-in';
import { HttpService } from '../../common/http.service';
import { MatDialog, MatDialogRef, MatCheckboxModule, MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})


export class UserLoginComponent implements OnInit {
  login = 'Login';
  submitting = false;
  returnUrl: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(EMAIL_REGEX)
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  signInFormControl = new FormGroup({
    emailFormControl: this.emailFormControl,
    passwordFormControl: this.passwordFormControl
  });

  constructor(
    private _http: HttpService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _loadingService: TdLoadingService,
  ) {}


  ngOnInit() {
    this.returnUrl = this._activateRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  signInUser(email: string, password: string, source?: string) {
    this.submitting = true;

    this._loadingService.register('user.login');
    this._http.request('/ajax/auth/login', {
      method: 'POST',
      body: {'email': email, 'password': password}
    }).then(({ result }) => {
      console.log('Login result: ', result);
      console.log('Successfully login...');
      localStorage.setItem('currentUser', JSON.stringify({'userName': result.username}));
      // TODO: return returnUrl
      this._loadingService.resolve('user.login');
      return this._router.navigate([this.returnUrl]);
    }).catch(errors => {
      if (errors instanceof Array) {
        this._loadingService.resolve('user.login');
        this._snackBar.open(errors[0].message, 'Error', {
          duration: 5000,
        });
      }
    }).then(() => {
      console.log('Submitting is false now');
      this.submitting = false;
    });
  }

}
