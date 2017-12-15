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
import { MatSnackBar } from '@angular/material';
import { ITdDataTableColumn } from '@covalent/core';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import * as moment from 'moment';


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
  public jobConfig: JobConfig = new JobConfig();

  envvars: any;
  alive = true;
  loading: boolean;
  asyncJobs: Observable<any[]>;
  total: number;
  p = 1;
  jobConfigName: string;
  jobs: any[];
  filteredJobs: any[];

  constructor(
    public _activatedRoute: ActivatedRoute,
    private _jobService: JobService,
    private _dialogService: TdDialogService,
    private _loadingService: TdLoadingService,
    private _snackBarService: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      params => {
        this.jobConfigName = params['jobConfigName'];
        this.getJobConfigDetail(this.jobConfigName);
        this.load();
      }
    );
    this.getPage(1);
  }

  public getJobConfigDetail(name: string) {
    this._jobService
      .getConfigByName(name)
      .subscribe(data => {
        this.jobConfig = data.json();
        this.envvars = this.jobConfig.envvars.filter(el => {
          return el.name !== "repo";
        });
        console.log('jobconfig???', this.jobConfig)
      });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('job.history');
      const response = await this._jobService.getJobList(100, 1, this.jobConfigName).toPromise();
      this.jobs = response.json()['results'];
      this.filteredJobs = this.jobs;
    } catch (error) {
      console.log('error');
    } finally {
      this._loadingService.resolve('job.history');
    }
  }

  deletClicked(event, jobUUID: string): void {
    event.stopPropagation();
    this._dialogService
      .openConfirm({message: 'Are you sure to delete this job history'})
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          console.log('confirmed', jobUUID);
          this._delete(jobUUID);
        }
      });
  }

  private async _delete(jobUUID: string): Promise<void> {
    try {
      this._loadingService.register('job.history');
      await this._jobService.deleteJobById(jobUUID);
      this.jobs = this.filteredJobs.filter((item: any[]) => {
        return item['job_uuid'] !== jobUUID;
      });
      this.filteredJobs = this.jobs;
      this._snackBarService.open('Job Deleted', 'OK', {duration: 3000, politeness: 'polite'});
    } catch (error) {
      this._snackBarService.open(error[0].message, 'Error', {duration: 3000, politeness: 'polite'});
    } finally {
      this._loadingService.resolve('job.history');
    }
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncJobs = this._jobService.getJobList(5, page, this.jobConfigName)
      .do(res => {
        this.total = res.json()['count'];
        this.p = page;
        this.loading = false;
      })
      .map(res => res.json()['results']);
  }

  public calculateTimeCost(jobDetail) {
    if (jobDetail.started_at && jobDetail.ended_at) {
      const startedAt = moment(jobDetail.started_at);
      const endedAt = moment(jobDetail.ended_at);
      return +endedAt - +startedAt;
    } else {
      return -1;
    }
  }

}
