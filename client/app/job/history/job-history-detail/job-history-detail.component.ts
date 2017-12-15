import { Input, OnDestroy } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from './../../job.service';
import { JobDetail } from './../../model/job-model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import * as moment from 'moment';

@Component({
  selector: 'app-job-history-detail',
  templateUrl: './job-history-detail.component.html',
  styleUrls: ['./job-history-detail.component.scss']
})
export class JobHistoryDetailComponent implements OnInit, OnDestroy {
  @Input() polling = true;
  @Input() pollingInterval: number = 30 * 1000;
  pollingTimer: any;

  disabled = false;
  public jobDetail: JobDetail = new JobDetail();
  jobID: string;
  logs: any[];
  timeCost: any;

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
    this._jobService.getJobDetail(this.jobID)
      .subscribe(data => {
        this.jobDetail = data.json();
        this.timeCost = this._calculateTimeCost();
        this._startPolling();
      });
  }

  ngOnDestroy() {
    clearTimeout(this.pollingTimer);
  }

  async _startPolling() {

    try {
      this._loadingService.register('job.logs');
      await this._pollLogs();

      if (this.polling) {
        this.resetPollingTimer();
      }
    } catch (err) {
      this.logs = [{log: 'No logs'}];
    } finally {
      this._loadingService.resolve('job.logs');
    }


  }

  private resetPollingTimer() {
    clearTimeout(this.pollingInterval);
    this.pollingTimer = setTimeout(() => {
      this._startPolling()
    }, this.pollingInterval);
  }


  private _getParams() {
    const params = {

    };
    params['start_time'] = this._dateStrToTimestamp(this.jobDetail.created_at) - 1800;

    if (this.jobDetail.ended_at) {
      params['end_time'] = this._dateStrToTimestamp(this.jobDetail.ended_at) + 3600;
    } else {
      params['end_time'] = params['start_time'] + 3600 * 10;
    }
    return params;
  }

  // Duplicate with list, TODO: move to util
  private _calculateTimeCost() {
    if (this.jobDetail.started_at && this.jobDetail.ended_at) {
      const startedAt = moment(this.jobDetail.started_at);
      const endedAt = moment(this.jobDetail.ended_at);
      return +endedAt - +startedAt;
    } else {
      return -1;
    }
  }

  async _pollLogs() {
    const params = this._getParams();
    const logs = await this._jobService.getJobLogs(this.jobID, 1, params['start_time'], params['end_time']);
    this.logs = logs.results;
  }

  private _dateStrToTimestamp(dateStr) {
    const DATE_REG = /^(\d{1,4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})\.(.+)$/;
    const result = dateStr.match(DATE_REG);
    const dt = new Date(Date.UTC(result[1], result[2] - 1, result[3], result[4], result[5], result[6]));
    return +(dt.getTime() / 1000).toFixed();
  }
}
