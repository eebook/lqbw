import { ModalService } from './modal/modal.service';
import { MdDialogRef } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './components/components.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    CommonModule,
    ComponentsModule,
  ],
  providers: [
    ModalService,
  ]
})
export class SharedModule {
}
