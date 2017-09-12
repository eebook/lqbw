import { JobConfig } from './../../model/job-model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JobService } from '../../job.service';

@Component({
  selector: 'app-job-config-detail',
  templateUrl: './job-config-detail.component.html',
  styleUrls: ['./job-config-detail.component.scss']
})
export class JobConfigDetailComponent implements OnInit {
  public job_config: JobConfig = new JobConfig();

  constructor(
    public activeRoute: ActivatedRoute,
    private job_service: JobService,
  ) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => this.getJobConfigDetail(params['jobConfigName'])
    );

  }

  public getJobConfigDetail(name: string) {
    this.job_service
      .getConfigByName(name)
      .subscribe(data => {
        this.job_config = data.json();
        console.log('data json???', data.json());
      });
  }
}
