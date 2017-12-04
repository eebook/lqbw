import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.scss']
})
export class BookstoreComponent implements OnInit {
  pins: any[];

  constructor() { }

  ngOnInit() {
  }
  createRange(len= 20) {
    let arr = [];
    for (let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
}
