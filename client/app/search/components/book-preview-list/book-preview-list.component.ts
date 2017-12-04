import { Component, Input } from '@angular/core';
import { Book, } from '../../models/book';

@Component({
  selector: 'app-book-preview-list',
  templateUrl: './book-preview-list.component.html',
  styleUrls: ['./book-preview-list.component.scss']
})
export class BookPreviewListComponent {
  @Input() books: Book[];

  createRange(len= 20) {
    let arr = [];
    for (let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
}
