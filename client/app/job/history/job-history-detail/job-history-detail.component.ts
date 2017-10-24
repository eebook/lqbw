import { TdLoadingService } from '@covalent/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from './../../job.service';
import { JobDetail } from './../../model/job-model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-job-history-detail',
  templateUrl: './job-history-detail.component.html',
  styleUrls: ['./job-history-detail.component.scss']
})
export class JobHistoryDetailComponent implements OnInit {
  disabled = false;
  public jobDetail: JobDetail = new JobDetail();
  jobID: string;
  logs: any[];

  constructor(
    public _activatedRoute: ActivatedRoute,
    private _jobService: JobService,
    private _loadingService: TdLoadingService,
  ) {

  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      params => {
        this.jobID = params['jobID'];
      }
    );
    console.log('this.jobID???', this.jobID);
    this._jobService.getJobDetail(this.jobID)
    // .interval(5000)
    .subscribe(data => {
      this.jobDetail = data.json();
      console.log('data json???', data.json());
      console.log('jobDetail??? ', this.jobDetail);
      this._startPolling();
    });
  }

  async _startPolling() {
    try {
      this._loadingService.register('job.logs');
      await this._pollLogs();
    } catch (err) {
      this.logs = [{log: 'Not logs'}];
      console.log('Not logs');
    } finally {
      this._loadingService.resolve('job.logs');
    }
  }

  expandedEvent() {

  }

  collapsedEvent() {

  }

  private _getParams() {
    const params = {

    };
    console.log('jobdetail???', this.jobDetail);
    // if (false) {
    //   console.log('created_at??', this.jobDetail.created_at);
    //   params['start_time'] = this.jobDetail.created_at;
    // } else {
      console.log('created_at??', this.jobDetail.created_at);
      params['start_time'] = this._dateStrToTimestamp(this.jobDetail.created_at) - 1800;
    // }

    if (this.jobDetail.ended_at) {
      console.log('ended_at???', this.jobDetail.ended_at);
      params['end_time'] = this._dateStrToTimestamp(this.jobDetail.ended_at) + 3600;
    } else {
      params['end_time'] = params['start_time'] + 3600 * 10;
    }
    return params;
  }

  async _pollLogs() {
    const params = this._getParams();
    console.log('params??? ', params);

    const logs = await this._jobService.getJobLogs(this.jobID, 1, params['start_time'], params['end_time']);
    this.logs = logs.results;
  }

  private _dateStrToTimestamp(dateStr) {
    const DATE_REG = /^(\d{1,4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})\.(.+)$/;
    const result = dateStr.match(DATE_REG);
    console.log('result???', result);
    const dt = new Date(Date.UTC(result[1], result[2] - 1, result[3], result[4], result[5], result[6]));
    return +(dt.getTime() / 1000).toFixed();
  }
}
