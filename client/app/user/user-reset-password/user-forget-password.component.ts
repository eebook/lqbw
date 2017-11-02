import { CaptchaImgComponent } from './../../common/captcha-img-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { HttpService } from './../../common/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-forget-password',
  templateUrl: './user-forget-password.component.html',
  styleUrls: ['./user-forget-password.component.scss']
})
export class UserForgetPasswordComponent implements OnInit {
  @ViewChild(CaptchaImgComponent) captchaImg: CaptchaImgComponent;
  submitting: boolean;
  sendCodeHint: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(EMAIL_REGEX)
  ]);
  captchaFormControl = new FormControl('', [
    Validators.required,
  ]);
  resetSendCodeFormControl = new FormGroup({
    emailFormControl: this.emailFormControl,
    captchaFormControl: this.captchaFormControl
  });

  constructor(
    private _http: HttpService,
    private _router: Router,
    private _loadingService: TdLoadingService
  ) { }



  ngOnInit() {
  }

  get submitDisabled(): boolean {
    return !this.resetSendCodeFormControl.valid || this.submitting;
  }

  sendVerifyCode(email: string, captchaCode: string) {
    if (this.submitDisabled) {
      return;
    }

    this._loadingService.register('reset.password.send.code');
    this._loadingService.resolve('reset.password.send.code');
    this._http.request('/ajax/user/send_verify_code', {
      method: 'POST',
      body: {'email': email, 'code': captchaCode}
    }).then(({ result }) => {
      if (result.captcha) {
        this.captchaImg.captchaSrc = result.image_url;
        throw [{ code: 'invalid_captcha' }];
      } else {
        return this._router.navigate(['user/forget-password/reset', email]);
      }
    }).catch((errors: any[]) => {
      console.log('TODO, errors');
    }).then(() => {
      this.submitting = false;
    });

  }
}
