import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Search } from './model/search-model';
import { GithubService } from './search.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})


export class SearchingComponent {
  public searchModel1: Search;

  constructor() {
    this.searchModel1 = new Search('', '');
  }
}
