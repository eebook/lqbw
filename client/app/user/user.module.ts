import { CaptchaImgComponent } from './../common/captcha-img-component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserComponent } from './user.component';
import { userRoutes } from './user.routes';
import { AuthService } from './../common/auth.service';
import { UserForgetPasswordComponent } from './user-forget-password/user-forget-password.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { ResetPasswordCompleteComponent } from './reset-password-complete/reset-password-complete.component';
import { UserRegisterSuccessComponent } from './user-register-success/user-register-success.component';
import { UserActivate } from './user-activate/user-activate.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserForgetPasswordComponent,
    UserComponent,
    CaptchaImgComponent,
    UserResetPasswordComponent,
    ResetPasswordCompleteComponent,
    UserRegisterSuccessComponent,
    UserActivate
  ],
  providers: [
    AuthService
  ]
})
export class UserModule { }
