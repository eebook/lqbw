import { RouterModule, CanActivate } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './common/auth.service';

import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { SettingsComponent } from './settings/settings.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './core/components/notfound/not-found.component';


export const appRoutes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: './search/search.module#BooksModule',
      },
      {
        path: 'about',
        loadChildren: './about/about.module#AboutModule',
      },
      // {
      //   path: 'settings',
      //   loadChildren: './settings/settings.module#SettingsModule',
      //   canActivate: [AuthGuard]
      // },
      // { path: 'account/auth/github', component: AccountComponent },
      {
        path: 'job',
        loadChildren: './job/job.module#JobModule',
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'bookstore',
    loadChildren: './bookstore/bookstore.module#BookstoreModule',
  },

  { path: '**', component: NotFoundComponent }
];
