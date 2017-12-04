import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { MasonryModule } from '../shared/masonry'

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { ComponentsModule } from './components';
import { BookEffects } from './effects/book';
import { SearchBookComponent } from './containers/search/search.component';
import { reducers } from './reducers';
import { searchRoutes } from './search.routes';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    // MasonryModule,

    ComponentsModule,
    RouterModule.forChild(searchRoutes),
    StoreModule.forFeature('books', reducers),
    EffectsModule.forFeature([BookEffects, ]),
  ],
  declarations: [
    SearchBookComponent,
  ],
  // providers: [BookExistsGuard],
})
export class BooksModule {}
