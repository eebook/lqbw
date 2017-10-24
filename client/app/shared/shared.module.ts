import { BrowserModule } from '@angular/platform-browser';
import { SignInUpComponent } from './modal/sign-in-up/sign-in-up.component';
import { ModalService } from './modal/modal.service';
import { MatDialogRef } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule,
} from '@covalent/core';
import {
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule,
} from '@angular/material';

const FLEX_LAYOUT_MODULES: any[] = [
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule,
];


@NgModule({
  declarations: [
    SignInUpComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
  ],
  exports: [
    SignInUpComponent,
    CommonModule,
    ComponentsModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES,
  ],
  providers: [
    ModalService,
  ]
})
export class SharedModule {
}
