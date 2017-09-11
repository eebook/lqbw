import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService, SimpleRequest } from './../../../common/http.service';
import { JobService } from './../../job.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

interface JobConfigResponse {
  items: string[];
  total: number;
}
interface IServerResponse {
  items: string[];
  total: number;
}

@Component({
  selector: 'app-job-config-list',
  templateUrl: './job-config-list.component.html',
  styleUrls: ['./job-config-list.component.scss'],
  providers: [ HttpService, SimpleRequest ]
})

export class JobConfigListComponent implements OnInit, OnDestroy {
  alive = true;
  loading: boolean;
  asyncJobConfigs: Observable<any[]>;
  total: number;
  p = 1;

  constructor(
    private job_service: JobService,
    // private http: SimpleRequest,
    private http: Http,
  ) {
  }

  ngOnDestroy() {
    // TODO: to unscript
    this.alive = false;
  }

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
    console.log('now page???' + page);
    console.log('now this.p?' + this.p);
    // TODO: Auto reload
    // Observable.interval(10000).takeWhile(_ => this.p !== page).subscribe(x => {
      this.asyncJobConfigs = this.jobConfigResult(page)
      .do(res => {
        this.total = res.json()['count'];
        this.p = page;
        this.loading = false;
        console.log('this.total: ', this.total);
        console.log('this.p', this.p);
        console.log('this.loading', this.loading);
        console.log('res.items', res.json()['results']);
      })
      .map(res => res.json()['results']);
    // });
   }

  jobConfigResult(page: number): Observable<Response> {
    return this.http.request('/ajax/job_configs?page_size=5&page=' + page);
  }
}
