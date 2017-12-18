import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Book } from './../model/book';
import { BookService } from './../book.service';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ResponseContentType } from '@angular/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  bookDetail: Book = new Book();
  bookID: string;
  item: any;
  downloading = false;
  btnMessage = 'Download';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _bookService: BookService,
    private _http: Http,
    private _snackBarService: MatSnackBar,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      params => {
        this.getBookDetail(params['bookID']);
        this.bookID = params['bookID'];
      }
    );
  }

  private getBookDetail(bookID: string) {
    this._bookService
      .getBookDetail(bookID)
      .subscribe(data => {
        console.log('book detail: ', data.json().result)
        this.bookDetail = data.json().result;
      },
      (error) => {
        if (error.json().errors[0].code === "book_not_exist") {
          this._snackBarService.open("The book does not exist", 'Error', {
            duration: 5000,
          })
        }
        this._bookService.deleteABook(bookID).toPromise();
        // TODO: back to where you come from
        this._router.navigate(['/bookstore']);
      }
    );
  }

  private downloadFile() {
    console.log('Download file');
    console.log('download url: ', this.bookDetail.download_url);
    this.downloading = true;
    this.btnMessage = 'Downloading';
    this._http.get(
      this.bookDetail.download_url,
      {responseType: ResponseContentType.Blob}).subscribe(
        (response) => {
          const mediaType = 'application/epub+zip';
          const blob = new Blob([response.blob()], {type: mediaType});
          const filename = this.bookDetail.title;
          saveAs(blob, filename);
        },
        (error) => {
            this._snackBarService.open("Network issue", 'Error', {
              duration: 5000,
            })
        },
        () => {
          this.downloading = false;
          this.btnMessage = 'Download';
        }
      );

  }

  get isDownloading() {
    return this.downloading;
  }

  private goBack() {
    this._router.navigate(['/']);
  }
}
