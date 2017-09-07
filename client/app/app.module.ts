import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GrowlModule } from 'primeng/components/growl/growl';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { FormControlComponent } from './common/dynamic-form/form-control.component';
import { appRoutes } from './app.routes';
import { CommonModule } from './common/common.module';
import { AuthService, AuthGuard } from './common/auth.service';
import { HttpService } from './common/http.service';
import { JobService } from './job/job.service';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { SettingsComponent } from './settings/settings.component';
import { JobComponent } from './job/job.component';
import { JobHistoryDetailComponent } from './job/history/job-history-detail/job-history-detail.component';
import { JobHistoryListComponent } from './job/history/job-history-list/job-history-list.component';
import { JobConfigCreateComponent } from './job/config/job-config-create/job-config-create.component';
import { JobConfigListComponent } from './job/config/job-config-list/job-config-list.component';
import { SearchingComponent } from './searching/searching.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserRegisterComponent,
    FormControlComponent,
    UserLoginComponent,
    BookstoreComponent,
    SettingsComponent,
    JobComponent,
    JobHistoryDetailComponent,
    JobHistoryListComponent,
    JobConfigCreateComponent,
    JobConfigListComponent,
    SearchingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    // RouterModule,
    GrowlModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    HttpService,
    JobService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
