import { MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core';
import { Component, OnInit, Input, Injector} from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FieldBase, Textbox, Image } from '../../common/dynamic-form/form-field';
import { fadeIn } from '../../animations/fade-in';
import { HttpService } from '../../common/http.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  // animations: [ fadeIn ],
})

export class UserRegisterComponent implements OnInit {
  submitting = false;

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
  signUpFormControl = new FormGroup({
    emailFormControl: this.emailFormControl,
    passwordFormControl: this.passwordFormControl
  })

  constructor(
    private injector: Injector,
    private _http: HttpService,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _loadingService: TdLoadingService
  ) {
  }

  ngOnInit() {
  }

  protected get injectorInstance() {
    return this.injector;
  }

  signUpUser(email: string, username: string, password: string) {
    console.log('Registering...');
    this.submitting = true;

    this._loadingService.register('user.register');
    this._http.request('/ajax/auth/register', {
      method: 'POST',
      body: {'username': username, 'email': email, 'password': password}
    }).then(() => {
      console.log('Successfully registerd...');
      this._loadingService.resolve('user.register');
      return this._router.navigate(['user/register-success']);
    }).catch(errors => {
      if (errors instanceof Array) {
        this._loadingService.resolve('user.register');
        this._snackBar.open(errors[0].message, 'Error', {
          duration: 5000,
        });
      }
    }).then(() => {
      console.log('Submitting is false now');
      this.submitting = false;
    });
  }

  loginWithGithub() {
    console.log('The user is landing...');
    this.submitting = true;

    this._http.request('/auth/github', {
      method: 'GET',
    }).then(({ result }) => {
      console.log('Login result: ', result);
      console.log('Successfully login...');
      localStorage.setItem('currentUser', JSON.stringify({'userName': result.username}));
      return this._router.navigate(['bookstore']);
    }).catch(errors => {
      if (errors instanceof Array) {
        console.log(errors);
      }
    }).then(() => {
      console.log('Submitting is false now');
      this.submitting = false;
    });
  }
}
