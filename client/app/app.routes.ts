import { BookComponent } from './bookstore/book/book.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { JobConfigDetailComponent } from './job/config/job-config-detail/job-config-detail.component';
import { JobHistoryDetailComponent } from './job/history/job-history-detail/job-history-detail.component';
import { JobHistoryListComponent } from './job/history/job-history-list/job-history-list.component';
import { JobConfigListComponent } from './job/config/job-config-list/job-config-list.component';
import { JobConfigCreateComponent } from './job/config/job-config-create/job-config-create.component';
// import { JobComponent } from './job/job.component';
import { AuthGuard } from './common/auth.service';
import { RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { SettingsComponent } from './settings/settings.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';


export const appRoutes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'search', component: SearchComponent },
      // { path: 'register', component: UserRegisterComponent },
      // { path: 'login', component: UserLoginComponent },
      // {
      //   path: 'bookstore',
      //   children: [
      //     { path: '', component: BookstoreComponent },
      //     { path: 'book/:bookID', component: BookComponent }
      //   ]
      // },
      // {
        // path: 'bookstore',
        // loadChildren: './bookstore/bookstore.module#BookstoreModule',
      // },
      { path: 'about', component: AboutComponent },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
      },
      { path: 'account/auth/github', component: AccountComponent },
      {
        path: 'job',
        loadChildren: './job/job.module#JobModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  // {
  //   path: 'search',
  //   component: SearchComponent
  // },
  {
    path: 'bookstore',
    loadChildren: './bookstore/bookstore.module#BookstoreModule',
    canActivate: [AuthGuard]
  },
];
