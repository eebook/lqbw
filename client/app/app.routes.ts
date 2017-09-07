import { JobHistoryDetailComponent } from './job/history/job-history-detail/job-history-detail.component';
import { JobHistoryListComponent } from './job/history/job-history-list/job-history-list.component';
import { JobConfigListComponent } from './job/config/job-config-list/job-config-list.component';
import { JobConfigCreateComponent } from './job/config/job-config-create/job-config-create.component';
import { JobComponent } from './job/job.component';
import { AuthGuard } from './common/auth.service';
import { RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { SettingsComponent } from './settings/settings.component';
import { BookstoreComponent } from './bookstore/bookstore.component';


export const appRoutes = [
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bookstore',
    component: BookstoreComponent
  },
  {
    path: 'job',
    children: [
      { path: '', redirectTo: 'config/list', pathMatch: 'full' },
      {
        path: 'config',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: JobConfigListComponent },
          { path: 'create', component: JobConfigCreateComponent },
        ]
      },
      {
        path: 'history',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: JobHistoryListComponent },
          { path: 'detail', component: JobHistoryDetailComponent }
        ]
      }
    ]
  }
];
