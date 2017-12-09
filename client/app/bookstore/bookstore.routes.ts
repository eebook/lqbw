import { AuthGuard } from './../common/auth.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookstoreComponent } from './bookstore.component';
import { RouterModule } from '@angular/router';

export const bookstoreRoutes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BookstoreComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'book/:bookID',
        component: BookDetailComponent
      }
    ]
  },
//   { path: 'book/:bookID', component: BookComponent }
];

