import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule
} from '@angular/material';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { SearchInputComponent } from './search-input/search-input.component';

export const COMPONENTS = [
  SearchInputComponent
]

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
