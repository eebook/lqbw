import { BookService } from './book.service';
import { BookstoreComponent } from './bookstore.component';
import { bookstoreRoutes } from './bookstore.routes';
import { BookComponent } from './book/book.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CovalentLoadingModule, CovalentDialogsModule, CovalentMediaModule, CovalentLayoutModule,
  CovalentSearchModule, CovalentCommonModule } from '@covalent/core';


@NgModule({
  imports: [
    SharedModule,
    NgxPaginationModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    RouterModule.forChild(bookstoreRoutes),
  ],
  declarations: [
    BookComponent,
    BookstoreComponent,
  ],
  providers: [
    BookService,
  ]
})
export class BookstoreModule { }
