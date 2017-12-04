import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Config } from './shared/utils/config';
import { UserModule } from './user/user.module';
import { SignInUpComponent } from './shared/modal/sign-in-up/sign-in-up.component';
import { ComponentsModule } from './shared/components/components.module';
import { SharedModule } from './shared/shared.module';
import { JobModule } from './job/job.module';
import { EffectsModule } from '@ngrx/effects';
import {
  ReactiveFormsModule,
  FormsModule } from '@angular/forms';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { FormControlComponent } from './common/dynamic-form/form-control.component';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';

import { AuthService, AuthGuard } from './common/auth.service';
import { HttpService, SimpleRequest } from './common/http.service';
import { JobService } from './job/job.service';
import { JobConfigDetailComponent } from './job/config/job-config-detail/job-config-detail.component';
import { ConfirmBoxComponent } from './shared/components/confirm-box/confirm-box.component';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'angular2-schema-form';
import { AccountComponent } from './account/account.component';
// import { MasonryModule } from 'angular2-masonry';
// import { NgxMasonryModule } from 'ngx-masonry';

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
// import { ParticlesModule } from 'angular-particle';
// import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
// import { AppReducer } from './shared/ngrx/index';
import { TranslateLoader } from '@ngx-translate/core';
import { CoreModule } from './core/core.module';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { DBModule } from '@ngrx/db';
import { schema } from './db';

@NgModule({
  declarations: [
    AppComponent,
    FormControlComponent,
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
    DBModule.provideDB(schema),
    CovalentHttpModule.forRoot(),
    CovalentSearchModule,
    SharedModule,
    // NgxMasonryModule,
    // MultilingualModule.forRoot([{
    //   provide: TranslateLoader,
    //   deps: [HttpClient],
    //   useFactory: (translateLoaderFactory)
    // }]),
    // StoreModule.provideStore(AppReducer),
    SchemaFormModule,
    ComponentsModule,
    // StoreModule.provideStore(rootReducer),
    // Note that you must instrument after importing StoreModule
    // StoreDevtoolsModule.instrumentOnlyWithExtension({
      // maxAge: 5
    // }),
    EffectsModule.forRoot([]),
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    // ParticlesModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(appRoutes, ),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    // Note that you must instrument after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })

  ],
  providers: [
    // HttpClient,
    AuthService,
    HttpService,
    JobService,
    // MultilingualService,
    SimpleRequest,
    AuthGuard,
    // {
      // provide: Languages,
      // useValue: Config.GET_SUPPORTED_LANGUAGES()
    // }HttpHandler,
    {provide: WidgetRegistry, useClass: DefaultWidgetRegistry},
  ],
  bootstrap: [
    AppComponent
  ],
  // entryComponents : [SignInUpComponent]
})
export class AppModule { }
