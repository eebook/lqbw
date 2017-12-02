import { Component, Input } from '@angular/core';

import { Book } from '../../models/book';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.scss']
})
export class BookAuthorsComponent {
  @Input() book: Book;

  get authors() {
    return this.book.author;
  }

  get createdBy() {
    return this.book.created_by;
  }
}
