import { PipesModule } from './../shared/pipes/index';
import { BookService } from './book.service';
import { BookstoreComponent } from './bookstore.component';
import { bookstoreRoutes } from './bookstore.routes';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MasonryModule } from 'angular2-masonry';
import {
  CovalentLoadingModule,
  CovalentDialogsModule,
  CovalentMediaModule,
  CovalentLayoutModule,
  CovalentCommonModule
} from '@covalent/core';
import { MatCardModule } from '@angular/material';


@NgModule({
  imports: [
    SharedModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentCommonModule,
    MasonryModule,
    MatCardModule,
    PipesModule,
    RouterModule.forChild(bookstoreRoutes),
  ],
  declarations: [
    BookDetailComponent,
    BookstoreComponent,
  ],
  providers: [
    BookService,
  ]
})
export class BookstoreModule { }
