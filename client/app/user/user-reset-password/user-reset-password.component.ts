import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpService } from './../../common/http.service';
import { TdLoadingService } from '@covalent/core';
import { MatSnackBar } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent implements OnInit {
  submitting: boolean;
  account: string;

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  resetPasswordFormControl = new FormControl('', [
    Validators.required
    // TODO add confirm validator
  ]);

  verificationCodeFormControl = new FormControl('', [
    Validators.required
  ]);

  resetPasswordFormControlGroup = new FormGroup({
    passwordFormControl: this.passwordFormControl,
    resetPasswordFormControl: this.resetPasswordFormControl,
    verificationCodeFormControl: this.verificationCodeFormControl
  });

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpService,
    private _loadingService: TdLoadingService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.account = this._route.snapshot.params['account'];
    console.log('account???', this.account);
  }

  get submitDisabled(): boolean {
    return !this.resetPasswordFormControlGroup.valid || this.submitting;
  }

  submit(_password: string, _captcha: string) {
    if (this.submitDisabled) {
      return;
    }
    this._loadingService.register('reset.password');
    const payload = {
      account: this.account,
      password: _password,
      captcha: Number(_captcha),
    };
    this.submitting = true;
    return this._http.request('/ajax/user/reset_password', {
      method: 'POST',
      body: payload
    }).then((result) => {
      this._loadingService.resolve('reset.password');
      return this._router.navigate(['user/reset-complete/' + this.account]);
    }).catch((errors: any[]) => {
      this._loadingService.resolve('reset.password');
      console.log('errors???', errors);
      if (errors[0].code === 'invalid_args') {
        this._snackBar.open(errors[0].fields[0].captcha[0], 'Error', {
          duration: 5000,
        });
      }
    }).then(() => {
      this.submitting = false;
    });
  }

}
