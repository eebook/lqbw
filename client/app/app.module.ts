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
import { BookstoreComponent } from './bookstore/bookstore.component';
import { SettingsComponent } from './settings/settings.component';
import { JobComponent } from './job/job.component';
import { ConfigComponent } from './job/config/config.component';
import { HistoryComponent } from './job/history/history.component';
import { ListComponent } from './job/config/list/list.component';
import { CreateComponent } from './job/config/create/create.component';
import { DetailComponent } from './job/history/detail/detail.component';


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
    ConfigComponent,
    HistoryComponent,
    ListComponent,
    CreateComponent,
    DetailComponent,
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
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
