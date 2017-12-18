import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { ModalService } from './../../../shared/modal/modal.service';
import { JobService } from './../../job.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import {
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableColumn,
  TdDialogService,
  TdLoadingService } from '@covalent/core';

@Component({
  selector: 'app-job-config-list',
  templateUrl: './job-config-list.component.html',
  styleUrls: ['./job-config-list.component.scss'],
})

export class JobConfigListComponent implements OnInit, OnDestroy {
  // alive = true;
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

  constructor(
    private _titleService: Title,
    public _jobService: JobService,
    // private _modalService: ModalService,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
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
      console.log(error);
      console.log(error.status);
      if (error.status === 401) {
        console.log('TODO: auth!!!!');
      }
    } finally {
      this._loadingService.resolve('job.list');
    }
  }

  startClicked(event, jobConfig) {
    console.log(this.tableData);
    // this._startJob(jobConfig['config_name']);
  }

  // updateClicked(jobConfig) {
  //   console.log('Update clicked: ', jobConfig);
  // }

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
      await this._jobService.startJob(payload);
    } catch (error) {
      this._snackBarService.open(error[0].message, 'Error', {duration: 3000, politeness: 'polite'});
    } finally {
      this._loadingService.resolve('job.list');
      console.log('TODO: jump jump');
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
      return o.name === "REPO";
    })[0];
    // TODO: result value could be none, found by e2e
    return result['value'];
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    console.log('search');
  }
}
