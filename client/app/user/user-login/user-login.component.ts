import { Component, OnInit, Input, Injector } from '@angular/core';
import { Http, Response} from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FieldBase, Textbox, Image } from './../../common/dynamic-form/form-field';
import { fadeIn } from './../../animations/fade-in';
import { HttpService } from '../../common/http.service';
import { MatDialog, MatDialogRef, MatCheckboxModule } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations: [ fadeIn ],
  providers: [ HttpService ]
})


export class UserLoginComponent implements OnInit {
  login = "asdfs";
  private isShopperLogin : boolean = false;
  private rememberMe : boolean = false;
  constructor(private dialog : MatDialog) {}


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
      Validators.required]);


  signUpFormControl = new FormGroup({
    emailFormControl : this.emailFormControl,
    passwordFormControl : this.passwordFormControl
  });
  ngOnInit() {
  }

  signInUser(email : string, password: string, source? : string) {
    // alert("Email: " + email + " Password : " +password);
    this.dialog.closeAll();
  }

  shopperLogin(){
    this.isShopperLogin = !this.isShopperLogin;
  }

  rememberTheUser(){
    this.rememberMe = !this.rememberMe;
  }

  regainPasswordClicked(){
    this.dialog.closeAll();
  }
}
