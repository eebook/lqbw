import { Component, Input } from '@angular/core';

import { BookTmp } from '../../models/book';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.scss']
})
export class BookAuthorsComponent {
  @Input() bookstmp: BookTmp;

  get authors() {
    if (this.bookstmp.author) {
      return this.bookstmp.author[0];
    }
  }
}
