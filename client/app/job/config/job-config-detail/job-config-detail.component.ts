import { Observable } from 'rxjs/Observable';
import { JobConfig } from './../../model/job-model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JobService } from '../../job.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-job-config-detail',
  templateUrl: './job-config-detail.component.html',
  styleUrls: ['./job-config-detail.component.scss']
})
export class JobConfigDetailComponent implements OnInit {
  public jobConfig: JobConfig = new JobConfig();
  alive = true;
  loading: boolean;
  asyncJobs: Observable<any[]>;
  total: number;
  p = 1;
  jobConfigName: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    private jobService: JobService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.jobConfigName = params['jobConfigName'];
        this.getJobConfigDetail(this.jobConfigName);
      }
    );
    this.getPage(1);
  }

  public getJobConfigDetail(name: string) {
    this.jobService
      .getConfigByName(name)
      .subscribe(data => {
        this.jobConfig = data.json();
        console.log('data json???', data.json());
      });
  }

  getPage(page: number) {
    console.log('WTF???');
    this.loading = true;
    this.asyncJobs = this.jobService.getJobList(5, page, this.jobConfigName)
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
