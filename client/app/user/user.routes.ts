import { UserComponent } from './user.component';
import { UserForgetPasswordComponent } from './user-reset-password/user-forget-password.component';
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
        path: 'forget_password',
        component: UserForgetPasswordComponent
      }
    ]
  }
];
