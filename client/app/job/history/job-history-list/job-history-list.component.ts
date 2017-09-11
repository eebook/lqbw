// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-job-history-list',
//   templateUrl: './job-history-list.component.html',
//   styleUrls: ['./job-history-list.component.scss']
// })
// export class JobHistoryListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

interface IServerResponse {
    items: string[];
    total: number;
}

@Component({
  selector: 'app-job-history-list',
  templateUrl: './job-history-list.component.html',
  styleUrls: ['./job-history-list.component.scss']
})
export class JobHistoryListComponent implements OnInit {
  asyncMeals: Observable<string[]>;
  p = 1;
  total: number;
  loading: boolean;

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncMeals = serverCall(this.generateMeals(), page)
      .do(res => {
        this.total = res.total;
        this.p = page;
        this.loading = false;
        console.log('this.total: ', this.total);
        console.log('this.p', this.p);
        console.log('this.loading', this.loading);
        console.log('res.items', res.items);
      })
      .map(res => res.items);
    console.log('asyncMeals', this.asyncMeals);
  }
  private generateMeals(): string[] {
    const meals = [];
    const dishes = [
        'noodles',
        'sausage',
        'beans on toast',
        'cheeseburger',
        'battered mars bar',
        'crisp butty',
        'yorkshire pudding',
        'wiener schnitzel',
        'sauerkraut mit ei',
        'salad',
        'onion soup',
        'bak choi',
        'avacado maki'
    ];
    const sides = [
        'with chips',
        'a la king',
        'drizzled with cheese sauce',
        'with a side salad',
        'on toast',
        'with ketchup',
        'on a bed of cabbage',
        'wrapped in streaky bacon',
        'on a stick with cheese',
        'in pitta bread'
    ];
    for (let i = 1; i <= 100; i++) {
      const dish = dishes[Math.floor(Math.random() * dishes.length)];
      const side = sides[Math.floor(Math.random() * sides.length)];
      meals.push('meal ' + i + ': ' + dish + ' ' + side);
    }
    return meals;
  }
}

/**
 * Simulate an async HTTP call with a delayed observable.
 */
function serverCall(meals: string[], page: number): Observable<IServerResponse> {
    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return Observable
        .of({
            items: meals.slice(start, end),
            total: 100
        }).delay(1000);
}
