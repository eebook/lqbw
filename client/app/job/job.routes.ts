import { JobComponent } from './job.component';
import { JobHistoryListComponent } from './history/job-history-list/job-history-list.component';
import { JobHistoryDetailComponent } from './history/job-history-detail/job-history-detail.component';
import { JobConfigListComponent } from './config/job-config-list/job-config-list.component';
import { JobConfigDetailComponent } from './config/job-config-detail/job-config-detail.component';
import { JobConfigCreateComponent } from './config/job-config-create/job-config-create.component';
import { RouterModule } from '@angular/router';

export const jobRoutes = [
  {
    path: '',
    component: JobComponent,
    children: [
      { path: '', redirectTo: 'config/list', pathMatch: 'full' },
      {
        path: 'config',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: JobConfigListComponent },
          { path: 'detail/:jobConfigName', component: JobConfigDetailComponent},
          // { path: 'create', component: JobConfigCreateComponent },
        ]
      },
      {
        path: 'history',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: JobHistoryListComponent },
          { path: 'detail/:jobID', component: JobHistoryDetailComponent }
        ]
      }
    ]
  },
  { path: 'config/create', component: JobConfigCreateComponent}
];
