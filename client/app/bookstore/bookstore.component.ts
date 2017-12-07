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
  pageSize = 50;
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

  createRange(len= 20) {
    let arr = [];
    for (let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
}
