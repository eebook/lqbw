import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent {
  @Input() book: Book;

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.title;
  }

  get subtitle() {
    return this.book.subtitle;
  }

  get description() {
    return this.book.summary;
  }

  get thumbnail(): string | boolean {
    if (this.book.images) {
      return this.book.images.small;
    }

    return false;
  }

  get createdBy() {
    return this.book.created_by;
  }
}
