import { BookComponent } from './book/book.component';
import { BookstoreComponent } from './bookstore.component';
import { RouterModule } from '@angular/router';

export const bookstoreRoutes = [
  {
    path: '',
    children: [
      { path: '', component: BookstoreComponent },
      { path: 'book/:bookID', component: BookComponent }
    ]
  },
//   { path: 'book/:bookID', component: BookComponent }
];

