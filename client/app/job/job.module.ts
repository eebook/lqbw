import { JobComponent } from './job.component';
import { JobService } from './job.service';
import { jobRoutes } from './job.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyWidgetRegistry } from './widget/widgetregistry';
import { MyStringWidget } from './widget/string/string.widget';
import { SharedModule } from '../shared/shared.module';
import { JobHistoryListComponent } from './history/job-history-list/job-history-list.component';
import { JobHistoryDetailComponent } from './history/job-history-detail/job-history-detail.component';
import { JobConfigDetailComponent } from './config/job-config-detail/job-config-detail.component';
import { JobConfigListComponent } from './config/job-config-list/job-config-list.component';
import { JobConfigCreateComponent } from './config/job-config-create/job-config-create.component';
// import { MdTabsModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { Http } from '@angular/http';
import {
  CovalentLoadingModule,
  CovalentDialogsModule,
  CovalentMediaModule,
  CovalentLayoutModule,
  CovalentSearchModule,
  CovalentCommonModule,
  CovalentExpansionPanelModule,
  CovalentStepsModule
} from '@covalent/core';
import {
  SchemaFormModule,
  WidgetRegistry,
  DefaultWidgetRegistry,
  StringWidget
} from 'angular2-schema-form';
import { PipesModule } from '../shared/pipes';
import { AuthenticatedHttpService } from './../shared/services/http/http.service';

@NgModule({
  imports: [
    SchemaFormModule,
    SharedModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentStepsModule,
    CovalentCommonModule,
    CovalentExpansionPanelModule,
    MatTabsModule,
    PipesModule,
    RouterModule.forChild(jobRoutes),
  ],
  declarations: [
    JobConfigCreateComponent,
    JobConfigListComponent,
    JobConfigDetailComponent,
    JobHistoryListComponent,
    JobHistoryDetailComponent,
    JobComponent,
    MyStringWidget,
  ],
  entryComponents: [MyStringWidget],
  providers: [
    JobService,
    { provide: WidgetRegistry, useClass: MyWidgetRegistry},
    { provide: Http, useClass: AuthenticatedHttpService },
  ]
})
export class JobModule { }
