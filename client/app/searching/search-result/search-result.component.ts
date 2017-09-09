import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Search } from '../model/search-model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() searchModel: Search;

  constructor() { }

  ngOnInit() {
  }

}
