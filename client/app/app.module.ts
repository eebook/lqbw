import { Config } from './shared/utils/config';
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

import {
  CovalentLayoutModule,
  CovalentStepsModule,
  CovalentSearchModule,
  CovalentDataTableModule
} from '@covalent/core';
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ParticlesModule } from 'angular-particle';
// import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
// import { AppReducer } from './shared/ngrx/index';
import { TranslateLoader } from '@ngx-translate/core';
// import { MultilingualModule, Languages, translateLoaderFactory, MultilingualEffects } from './shared/i18n/index';
// import { Languages } from './shared/i18n/index';
// import { MultilingualService } from './shared/i18n/services/multilingual.service';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';


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
    BrowserAnimationsModule,
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
    // BrowserAnimationsModule,
    SharedModule,
    // MultilingualModule.forRoot([{
    //   provide: TranslateLoader,
    //   deps: [HttpClient],
    //   useFactory: (translateLoaderFactory)
    // }]),
    // StoreModule.provideStore(AppReducer),
    SchemaFormModule,
    ComponentsModule,
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ParticlesModule,
    RouterModule.forRoot(appRoutes, ),
    // StoreModule.forRoot(reducers),
    // Note that you must instrument after importing StoreModule (config is optional)
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25 //  Retains last 25 states
    // })
  ],
  providers: [
    AuthService,
    HttpService,
    JobService,
    GithubService,
    // MultilingualService,
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
