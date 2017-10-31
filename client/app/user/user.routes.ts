import { UserComponent } from './user.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { RouterModule } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';

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
        path: 'reset_password',
        component: UserResetPasswordComponent
      }
    ]
  }
];
