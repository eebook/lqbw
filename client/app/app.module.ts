import { BookService } from './bookstore/book.service';
import { ComponentsModule } from './shared/components/components.module';
import { SharedModule } from './shared/shared.module';
import { JobModule } from './job/job.module';
import { GithubService } from './search/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxPaginationModule } from 'ngx-pagination';

import { GrowlModule } from 'primeng/components/growl/growl';
// import { ConfirmDialogModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { FormControlComponent } from './common/dynamic-form/form-control.component';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';

import { AuthService, AuthGuard } from './common/auth.service';
import { HttpService, SimpleRequest } from './common/http.service';
import { JobService } from './job/job.service';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { SearchComponent } from './search/search.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { JobConfigDetailComponent } from './job/config/job-config-detail/job-config-detail.component';
import { MaterialModule } from '@angular/material';
import { ConfirmBoxComponent } from './shared/components/confirm-box/confirm-box.component';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'angular2-schema-form';
import { AccountComponent } from './account/account.component';

import { CovalentLayoutModule, CovalentStepsModule, CovalentSearchModule } from '@covalent/core';
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './bookstore/book/book.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserRegisterComponent,
    FormControlComponent,
    UserLoginComponent,
    BookstoreComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultComponent,
    AccountComponent,
    MainComponent,
    AboutComponent,
    BookComponent,
    // ConfirmBoxComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    // (optional) Additional Covalent Modules imports
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    // CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentSearchModule,
    BrowserAnimationsModule,
    // NgxPaginationModule,
    // RouterModule,
    // GrowlModule,
    MaterialModule,
    SharedModule,
    ComponentsModule,
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    RouterModule.forRoot(appRoutes, )
  ],
  providers: [
    AuthService,
    HttpService,
    JobService,
    BookService,
    GithubService,
    SimpleRequest,
    AuthGuard,
    // {provide: WidgetRegistry, useClass: DefaultWidgetRegistry},
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
