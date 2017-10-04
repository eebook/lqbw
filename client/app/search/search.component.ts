import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Search } from './model/search-model';
import { GithubService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent {
  public searchModelFromDad: Search;

  constructor() {
    this.searchModelFromDad = new Search('', '');
  }
}
