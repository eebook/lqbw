import { MatSnackBar } from '@angular/material';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { Title } from '@angular/platform-browser';
import { JobService } from './../../job.service';
// import { ModalService } from './../../../shared/modal/modal.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

interface JobListResponse {
    items: string[];
    total: number;
}

@Component({
  selector: 'app-job-history-list',
  templateUrl: './job-history-list.component.html',
  styleUrls: ['./job-history-list.component.scss'],
})
export class JobHistoryListComponent implements OnInit, OnDestroy {
  alive = true;
  loading: boolean;
  total: number;
  p = 1;

  jobs: any[];
  filteredJobs: any[];

  constructor(
    private _jobService: JobService,
    private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
  ) {
  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this._titleService.setTitle('EEBook Job History');
    this.load();
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('job.history');
      const response = await this._jobService.getJobList(100, 1).toPromise();
      this.jobs = response.json()['results'];
      this.filteredJobs = this.jobs;
    } catch (error) {
      console.log('error');
    } finally {
      this._loadingService.resolve('job.history');
    }
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

  itemClicked(jobUUID: string): void {
  }
}
