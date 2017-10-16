import { ActivatedRoute } from '@angular/router';
import { JobService } from './../../job.service';
import { JobDetail } from './../../model/job-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-history-detail',
  templateUrl: './job-history-detail.component.html',
  styleUrls: ['./job-history-detail.component.scss']
})
export class JobHistoryDetailComponent implements OnInit {
  disabled = false;
  public jobDetail: JobDetail = new JobDetail();
  jobID: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    private jobService: JobService,
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.jobID = params['jobID'];
        this.getJobDetail(this.jobID);
      }
    );
    console.log('this.jobID???', this.jobID);
  }

  private getJobDetail(id: string) {
    this.jobService.getJobDetail(id)
      .subscribe(data => {
        this.jobDetail = data.json();
        console.log('data json???', data.json());
        console.log('jobDetail??? ', this.jobDetail);
      });
  }

  expandedEvent() {

  }

  collapsedEvent() {

  }
}
