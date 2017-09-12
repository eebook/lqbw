import { MdDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ConfirmBoxComponent
  ],
  exports: [
    ConfirmBoxComponent,
  ],
  providers: [],
  entryComponents: [
    ConfirmBoxComponent,
  ]
})

export class ComponentsModule {
}
