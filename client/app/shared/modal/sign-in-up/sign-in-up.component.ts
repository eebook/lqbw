import { MatDialog, MatDialogRef, MatCheckboxModule } from '@angular/material';
import { Component, Inject, Output, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-sign-in-up',
    templateUrl: './sign-in-up.component.html',
    styleUrls: ['./sign-in-up.component.css']
  })
  export class SignInUpComponent {
    login = 'Login';
    private isShopperLogin = false;
    private rememberMe = false;
    constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<SignInUpComponent>) {}

    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(EMAIL_REGEX)
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
