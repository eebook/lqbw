import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatCardModule,
  MatButtonModule,
} from '@angular/material';

import { NotFoundComponent } from './components/notfound/not-found.component';
import { SearchBooksService } from './services/search.service';


export const COMPONENTS = [
  NotFoundComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [SearchBooksService]
    };
  }
}

