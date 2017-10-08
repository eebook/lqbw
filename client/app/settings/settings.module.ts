import { settingsRoutes } from './settings.routes';
import { SettingsComponent } from './settings.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdSnackBarModule, MdIconModule, MdListModule, MdTooltipModule, MdCardModule, MdButtonModule,
         MdToolbarModule, MdInputModule, MdSlideToggleModule, MdMenuModule } from '@angular/material';

import { CovalentLoadingModule, CovalentDialogsModule, CovalentMediaModule, CovalentLayoutModule,
         CovalentSearchModule, CovalentCommonModule } from '@covalent/core';

import { UserService, IUser, USER_PROVIDER, USERS_API } from './services/user.service';


@NgModule({
  declarations: [
    SettingsComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    RouterModule.forChild(settingsRoutes),
    // angular modules
    CommonModule,
    FormsModule,
    RouterModule,
    // material modules
    MdSnackBarModule,
    MdIconModule,
    MdListModule,
    MdTooltipModule,
    MdCardModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdSlideToggleModule,
    MdMenuModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    // extra
  ], // modules needed to run this module
  providers: [
    // { provide: USERS_API, useValue: ''},
    USER_PROVIDER,
  ],
})
export class SettingsModule {}
