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
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'app-job-config-detail',
  templateUrl: './job-config-detail.component.html',
  styleUrls: ['./job-config-detail.component.scss']
})
export class JobConfigDetailComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);
  columns: ITdDataTableColumn[] = [
    { name: 'name',  label: 'Name' },
    { name: 'value', label: 'Value' },
  ];

  basicData: any[] = [
    {
      "name": 7454.6,
      "value": "sclutterham0@123-reg.co.uk",
    },
    {
      "name": 3561.4,
      "value": "mevason1@usatoday.com",
    },
  ];
  public jobConfig: JobConfig = new JobConfig();
  envvars: any;
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
        this.envvars = this.jobConfig.envvars.filter(el => {
          return el.name !== "repo";
        });
        console.log('jobconfig???', this.jobConfig)
      });
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncJobs = this.jobService.getJobList(5, page, this.jobConfigName)
      .do(res => {
        this.total = res.json()['count'];
        this.p = page;
        this.loading = false;
        // console.log('this.res: ', res);
        // console.log('this.total: ', this.total);
        // console.log('this.p', this.p);
        // console.log('this.items', res.json()['results']);
      })
      .map(res => res.json()['results']);
  }
}
