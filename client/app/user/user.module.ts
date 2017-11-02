import { CaptchaImgComponent } from './../common/captcha-img-component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserComponent } from './user.component';
import { userRoutes } from './user.routes';
import { AuthService } from './../common/auth.service';
import { UserForgetPasswordComponent } from './user-reset-password/user-forget-password.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  ],
  providers: [
    AuthService
  ]
})
export class UserModule { }
