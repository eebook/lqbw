import { BookService } from './book.service';
import { MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.scss']
})
export class BookstoreComponent implements OnInit {
  pins: any[];

  currentPage = 1;
  selectedRows: any[] = [];
  tableData: any[];

  constructor(
    private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _snackBarService: MatSnackBar,
    private _bookService: BookService,
  ) { }

  ngOnInit() {
    this._titleService.setTitle('EEBook Bookstore');
    this.load();
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('books.list');
      const response = await this._bookService.getBookList().toPromise();
      this.tableData = response.json()['results'];
      console.log('tableData????', this.tableData);
    } catch (error) {
      console.log(error)
      console.log(error.status)
    } finally {
      this._loadingService.resolve('books.list');
    }
  }

  async publicClicked(event, book) {
    console.log('Public clicked')
    try {
      this._loadingService.register('books.list');
      const response = await this._bookService.makeBookPublic(book.uuid).toPromise();
    } catch (error) {
    } finally {
      this._loadingService.resolve('books.list');
      this.load()
    }
  }

  async privateClicked(event, book) {
    console.log('Private clicked')
    try {
      this._loadingService.register('books.list');
      const response = await this._bookService.makeBookPrivate(book.uuid).toPromise();
    } catch (error) {
    } finally {
      this._loadingService.resolve('books.list');
      this.load()
    }
  }
}
