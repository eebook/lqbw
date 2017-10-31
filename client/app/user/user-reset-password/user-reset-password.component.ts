import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { HttpService } from './../../common/http.service';
import { Component, OnInit } from '@angular/core';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private _router: Router,
    private _loadingService: TdDialogService
  ) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(EMAIL_REGEX)
  ]);

  resetPasswordFormControl = new FormGroup({
    emailFormControl : this.emailFormControl,
  });

  ngOnInit() {
  }

}
