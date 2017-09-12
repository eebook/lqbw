import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Search } from '../model/search-model';
import { GithubService } from '../search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})


export class SearchFormComponent implements OnInit {
  @Input() searchModel: Search;
  @Output() searchUpdated: EventEmitter<Search> = new EventEmitter<Search>();

  constructor(private _searchService: GithubService) {

  }

  ngOnInit() {
    if (this.searchModel) {
      this.searchModel.searchString = '';
      this.searchBooks();
    }
  }

  searchBooks() {
    if (this.searchModel.searchString === '') {
      console.log('Not going to search');
      this.searchModel.searchResult = '';
    } else {
      // TODO: trim searchString.
      // TODO: use distinctUntilChanged() of Observable to avoid Press the button that does not change value
      this._searchService.updateUser(this.searchModel.searchString);
      this.getSearchResult();
    }
  }

  getSearchResult() {
    console.log('Getting search result');
    console.log('Got searchString: ' + this.searchModel.searchString);
    this._searchService.getUser().subscribe(user => {
      // TODO: Fix continued triggering of async requests when typing. Take up too much resource, bad UX.
      // Reference: https://stackoverflow.com/questions/32051273/angular-and-debounce
      this.searchModel.searchResult = user;
      this.searchUpdated.emit(this.searchModel);
      console.log('result: ', this.searchModel.searchResult);
    }, (err) => {
      console.log('err:' + err);
      this.searchModel.searchResult = '';
      // TODO: HTTP request are asynchronous, the UX here is not very good, need to add a regular interval query.
      // Use flatMapLatest
      // Reference: https://segmentfault.com/a/1190000007562818
      // Reference: NiceFish postlist.service.ts
      // Error handlering, reference: https://hackernoon.com/using-rxjs-to-handle-http-requests-what-ive-learned-4640aaf4646c
    }, () => {
      console.log('Done');
    });
  }
}
