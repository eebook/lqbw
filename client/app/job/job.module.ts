import { NgxPaginationModule } from 'ngx-pagination';
import { JobService } from './job.service';
import { jobRoutes } from './job.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'angular2-schema-form';
import { SharedModule } from '../shared/shared.module';
import { JobHistoryListComponent } from './history/job-history-list/job-history-list.component';
import { JobHistoryDetailComponent } from './history/job-history-detail/job-history-detail.component';
import { JobConfigDetailComponent } from './config/job-config-detail/job-config-detail.component';
import { JobConfigListComponent } from './config/job-config-list/job-config-list.component';
import { JobConfigCreateComponent } from './config/job-config-create/job-config-create.component';


@NgModule({
  imports: [
    SchemaFormModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild(jobRoutes),
  ],
  declarations: [
    JobConfigCreateComponent,
    JobConfigListComponent,
    JobConfigDetailComponent,
    JobHistoryListComponent,
    JobHistoryDetailComponent,
  ],
  providers: [
    JobService,
    {provide: WidgetRegistry, useClass: DefaultWidgetRegistry},
  ]
})
export class JobModule { }
