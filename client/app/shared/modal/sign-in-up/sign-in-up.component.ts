import { TdLoadingService } from '@covalent/core';
import { Router } from '@angular/router';
import { HttpService } from './../../../common/http.service';
import { MatDialog, MatDialogRef, MatCheckboxModule, MatSnackBar } from '@angular/material';
import { Component, Inject, Output, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-sign-in-up',
    templateUrl: './sign-in-up.component.html',
    styleUrls: ['./sign-in-up.component.scss'],
  })
  export class SignInUpComponent {
    LOGIN_TITLE = 'Login';
    REGISTER_TITLE = 'Register';
    private isShopperLogin = false;
    private rememberMe = false;
    submitting = false;

    constructor(
      private dialog: MatDialog,
      private http: HttpService,
      private router: Router,
      private _snackBar: MatSnackBar,
      private _loadingService: TdLoadingService,
      private dialogRef: MatDialogRef<SignInUpComponent>,
    ) {}

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
      emailFormControl : this.emailFormControl,
      passwordFormControl : this.passwordFormControl
    });

    signInUser(email: string, password: string, source?: string) {
      console.log('The user is landing...');
      // if (this.loginDisabled) {
        // return;
      // }
      this.submitting = true;

      this._loadingService.register('signInUp');
      this.http.request('/ajax/auth/login', {
        method: 'POST',
        body: {'email': email, 'password': password}
      }).then(({ result }) => {
        console.log('Login result: ', result);
        console.log('Successfully login...');
        localStorage.setItem('currentUser', JSON.stringify({'userName': result.username}));
        this._loadingService.resolve('signInUp');
        this.dialog.closeAll();
        return this.router.navigate(['']);
      }).catch(errors => {
        if (errors instanceof Array) {
          this._loadingService.resolve('signInUp');
          this._snackBar.open(errors[0].message, 'Error', {
            duration: 5000,
          });
        }
      }).then(() => {
        console.log('Submitting is false now');
        this.submitting = false;
      });
    }


    signUpUser(email: string, username: string, password: string) {
      console.log('Registering, email: ' + email + ' username: ' + username + ' password: ' + password);

      this._loadingService.register('signInUp');
      this.http.request('/ajax/auth/register', {
        method: 'POST',
        body: {'email': email, 'username': username, 'password': password}
      }).then(({ result }) => {
        console.log('Register result: ', result);
        this._loadingService.resolve('signInUp');
        this.dialog.closeAll();
        this._snackBar.open('Successfully registered');
      }).catch(errors => {
        if (errors instanceof Array) {
          this._loadingService.resolve('signInUp');
          this._snackBar.open(errors[0].message, 'Error', {
            duration: 5000,
          });
        }
      }).then(() => {
        console.log('Submitting is false now');
      });
    }

    rememberTheUser() {
      this.rememberMe = !this.rememberMe;
    }

    regainPasswordClicked() {
      this.dialog.closeAll();
    }

  }
