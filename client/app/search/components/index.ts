import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatChipsModule,
} from '@angular/material';

// import { NgxMasonryModule } from 'ngx-masonry';
// import { MasonryModule } from 'angular2-masonry';
// import { TagInputModule } from 'ngx-chips';
import { BookAuthorsComponent } from './book-authors/book-authors.component';
// import { BookDetailComponent } from './book-detail';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { BookPreviewListComponent } from './book-preview-list/book-preview-list.component';
import { SearchInputComponent } from './search-input/search-input.component';

import { PipesModule } from '../../shared/pipes';

export const COMPONENTS = [
  BookAuthorsComponent,
  // BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  SearchInputComponent,
];

@NgModule({
  imports: [
    SharedModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // TagInputModule,
    MatChipsModule,
    // NgxMasonryModule,
    // MasonryModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
