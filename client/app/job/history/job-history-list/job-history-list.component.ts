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
    this.asyncJobs = this.jobService.getJobList(5, page)
      .do(res => {
        this.total = res.json()['count'];
        this.p = page;
        this.loading = false;
        console.log('this.res: ', res);
        console.log('this.total: ', this.total);
        console.log('this.p', this.p);
        console.log('this.items', res.json()['results']);
      })
      .map(res => res.json()['results']);
  }
}
