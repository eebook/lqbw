import { UserModule } from './user/user.module';
import { SignInUpComponent } from './shared/modal/sign-in-up/sign-in-up.component';
import { ComponentsModule } from './shared/components/components.module';
import { SharedModule } from './shared/shared.module';
import { JobModule } from './job/job.module';
import { GithubService } from './search/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormControlComponent } from './common/dynamic-form/form-control.component';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';

import { AuthService, AuthGuard } from './common/auth.service';
import { HttpService, SimpleRequest } from './common/http.service';
import { JobService } from './job/job.service';
import { SearchComponent } from './search/search.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { JobConfigDetailComponent } from './job/config/job-config-detail/job-config-detail.component';
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
import { ParticlesModule } from 'angular-particle';


@NgModule({
  declarations: [
    AppComponent,
    FormControlComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultComponent,
    AccountComponent,
    MainComponent,
    AboutComponent,
    // SignInComponent
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
    // CovalentMarkdownModule,
    // CovalentDynamicFormsModule,
    CovalentSearchModule,
    BrowserAnimationsModule,
    SharedModule,
    SchemaFormModule,
    ComponentsModule,
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ParticlesModule,
    RouterModule.forRoot(appRoutes, )
  ],
  providers: [
    AuthService,
    HttpService,
    JobService,
    GithubService,
    SimpleRequest,
    AuthGuard,
    {provide: WidgetRegistry, useClass: DefaultWidgetRegistry},
  ],
  bootstrap: [
    AppComponent
  ],
  // entryComponents : [SignInUpComponent]
})
export class AppModule { }
