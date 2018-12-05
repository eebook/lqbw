import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { ModalService } from './../../../shared/modal/modal.service';
import { JobService } from './../../job.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableColumn,
  TdDialogService,
  TdLoadingService
} from '@covalent/core';

@Component({
  selector: 'app-job-config-list',
  templateUrl: './job-config-list.component.html',
  styleUrls: ['./job-config-list.component.scss'],
})

export class JobConfigListComponent implements OnInit, OnDestroy {
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 50;
  sortBy = 'first_name';
  selectedRows: any[] = [];

  tableData: any[];
  columns: ITdDataTableColumn[] = [
    { name: 'config_name', label: 'Name' },
    { name: 'type', label: 'Type' },
    { name: 'url', label: 'URL' },
    { name: 'last_run_time', label: 'Last Run Time' },
  ];
  startJobResult: any;

  constructor(
    private _titleService: Title,
    public _jobService: JobService,
    // private _modalService: ModalService,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
    private _translate: TranslateService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this._titleService.setTitle('EEBook Job Config');
    this.load();
  }

  ngOnDestroy() {
    // this.alive = false;
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('job.list');
      const response = await this._jobService.getConfigList(100, 1).toPromise();
      this.tableData = response.json()['results'];
    } catch (error) {
    } finally {
      this._loadingService.resolve('job.list');
    }
  }

  startClicked(event, jobConfig) {
    console.log('tabledata', this.tableData);
    const historiesToday = _.filter(this.tableData, function(item) {
      if (!_.isEmpty(item.last_job)
        && item.last_job.status === 'SUCCEEDED'
        && moment().diff(moment(moment.utc(item.last_job.started_at).valueOf()), 'days') === 0) {
        return true;
      }
      return false;
    });
    console.log('historiesToday', historiesToday);
    if (historiesToday.length > 0) {
      this._snackBarService.open('Ops! You have run successfully today, check your bookstore',
      'Error', {duration: 3000, politeness: 'polite'});
    }
    this._startJob(jobConfig['config_name']);
  }

  deleteClicked(event, jobConfig) {
    console.log('Delete clicked: ', jobConfig);
    this._dialogService
      .openConfirm({message: 'Are you sure to delete this job config?'})
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          console.log('confirmed');
          this._delete(jobConfig['config_name']);
        }
      });
  }

  private async _startJob(name: string): Promise<void> {
    try {
      this._loadingService.register('job.list');
      const payload = {
        'config_name': name
      };
      this.startJobResult = await this._jobService.startJob(payload);
    } catch (error) {
      this._snackBarService.open(error[0].message, 'Error', {duration: 3000, politeness: 'polite'});
    } finally {
      this._loadingService.resolve('job.list');
      this._router.navigateByUrl('/job/history/detail/' + this.startJobResult.result['job_uuid']);
    }
  }

  private async _delete(name: string): Promise<void> {
    try {
      this._loadingService.register('job.list');
      await this._jobService.deleteConfigByName(name);
      this.tableData = this.tableData.filter((item: any[]) => {
        return item['config_name'] !== name;
      });
      this._snackBarService.open('Job Config Deleted', 'OK', {duration: 3000, politeness: 'polite'});
    } catch (error) {
      this._snackBarService.open(error[0].message, 'Error', {duration: 3000, politeness: 'polite'});
    } finally {
      this._loadingService.resolve('job.list');
    }
  }

  private repoHref(config) {
    const result = _.filter(config.envvars, function(o) {
      return o.name === 'REPO';
    })[0];
    // TODO: result value could be none, found by e2e
    return result['value'];
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    console.log('search');
  }
}
