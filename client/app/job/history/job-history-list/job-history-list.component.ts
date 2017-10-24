import { MatSnackBar } from '@angular/material';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { Title } from '@angular/platform-browser';
import { JobService } from './../../job.service';
// import { ModalService } from './../../../shared/modal/modal.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';

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

  // filteredJobs = [
  //   { config_name: 'config_name', status: 'Failed', created_at: 'yestorday'},
  //   { config_name: 'config_name1', status: 'Failed', created_at: 'yestorday'},
  //   { config_name: 'config_name2', status: 'Failed', created_at: 'yestorday'},
  // ];

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
      console.log('jobs ???', this.jobs);
    } catch (error) {
      console.log('error');
    } finally {
      this._loadingService.resolve('job.history');
    }
  }

  deletClicked(event, jobUUID: string): void {
    event.stopPropagation();
    console.log('delete job???', jobUUID);
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
    console.log('item ???', jobUUID);
  }
}
