import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';


@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
})

export class MaterialModule {}
