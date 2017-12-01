import { Component, Input } from '@angular/core';
import { BookTmp } from '../../models/book';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent {
  @Input() bookstmp: BookTmp;

  get id() {
    return this.bookstmp.id;
  }

  get title() {
    return this.bookstmp.title;
  }

  get subtitle() {
    return this.bookstmp.subtitle;
  }

  get description() {
    return this.bookstmp.summary;
  }

  get thumbnail(): string | boolean {
    if (this.bookstmp.images) {
      return this.bookstmp.images.small;
    }

    return false;
  }
}
