import { ModalService } from './../../../shared/modal/modal.service';
import { JobService } from './../../job.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'app-job-config-list',
  templateUrl: './job-config-list.component.html',
  styleUrls: ['./job-config-list.component.scss'],

})

export class JobConfigListComponent implements OnInit, OnDestroy {
  alive = true;
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
    public jobService: JobService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.jobService.getConfigList(100, 1)
      .subscribe(res => {
        this.tableData = res.json()['results'];
      });
  }

  ngOnDestroy() {
    // TODO: to unscript
    this.alive = false;
  }

  startClicked(jobConfig) {
    console.log('Start clicked: ', jobConfig);
  }

  updateClicked(jobConfig) {
    console.log('Update clicked: ', jobConfig);
  }

  deleteClicked(jobConfig) {
    console.log('Delete clicked: ', jobConfig);
  }
  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    console.log('search');
  }
}
