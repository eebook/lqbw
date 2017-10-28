import { Router } from '@angular/router';
import { HttpService } from './../../../common/http.service';
import { MatDialog, MatDialogRef, MatCheckboxModule } from '@angular/material';
import { Component, Inject, Output, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-sign-in-up',
    templateUrl: './sign-in-up.component.html',
    styleUrls: ['./sign-in-up.component.scss'],
  })
  export class SignInUpComponent {
    login = 'Login';
    private isShopperLogin = false;
    private rememberMe = false;
    submitting = false;

    constructor(
      private dialog: MatDialog,
      private http: HttpService,
      private router: Router,
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
      alert('Email: ' + email + 'Password : ' + password);
      console.log('The user is landing...');
      // if (this.loginDisabled) {
        // return;
      // }
      this.submitting = true;

      this.http.request('/ajax/auth/login', {
        method: 'POST',
        body: {'email': email, 'password': password}
      }).then(({ result }) => {
        console.log('Login result: ', result);
        console.log('Successfully login...');
        localStorage.setItem('currentUser', JSON.stringify({'userName': result.username}));
        return this.router.navigate(['']);
      }).catch(errors => {
        if (errors instanceof Array) {
          console.log(errors);
        }
      }).then(() => {
        console.log('Submitting is false now');
        this.submitting = false;
      });
      this.dialog.closeAll();
    }

    shopperLogin() {
      this.isShopperLogin = !this.isShopperLogin;
    }

    rememberTheUser() {
      this.rememberMe = !this.rememberMe;
    }

    regainPasswordClicked() {
      this.dialog.closeAll();
    }

  }
