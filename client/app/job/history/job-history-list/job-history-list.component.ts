import { JobService } from './../../job.service';
import { ModalService } from './../../../shared/modal/modal.service';
import { SimpleRequest } from './../../../common/http.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

interface JobListResponse {
    items: string[];
    total: number;
}

@Component({
  selector: 'app-job-history-list',
  templateUrl: './job-history-list.component.html',
  styleUrls: ['./job-history-list.component.scss'],
  providers: [
    SimpleRequest,
  ]
})
export class JobHistoryListComponent implements OnInit, OnDestroy {
  alive = true;
  loading: boolean;
  asyncJobs: Observable<any[]>;
  total: number;
  p = 1;

  constructor(
    public jobService: JobService,
    private modalService: ModalService,
  ) {
  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
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
