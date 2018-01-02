import { UserRegisterSuccessComponent } from './user-register-success/user-register-success.component';
import { ResetPasswordCompleteComponent } from './reset-password-complete/reset-password-complete.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { UserComponent } from './user.component';
import { UserForgetPasswordComponent } from './user-forget-password/user-forget-password.component';
import { RouterModule } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserActivateComponent } from './user-activate/user-activate.component';

export const userRoutes = [
  {
    path: '',
    component : UserComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: UserLoginComponent
      },
      {
        path: 'register',
        component: UserRegisterComponent
      },
      {
        path: 'register-success',
        component: UserRegisterSuccessComponent,
      },
      {
        path: 'forget-password',
        component: UserForgetPasswordComponent
      },
      {
        path: 'reset/:account',
        component: UserResetPasswordComponent,
      },
      {
        path: 'reset-complete/:account',
        component: ResetPasswordCompleteComponent
      },
      {
        path: 'activate/:code',
        component: UserActivateComponent
      }
    ]
  }
];
