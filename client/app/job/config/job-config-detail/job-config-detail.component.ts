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
// import { MatTableDataSource } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

@Component({
  selector: 'app-job-config-detail',
  templateUrl: './job-config-detail.component.html',
  styleUrls: ['./job-config-detail.component.scss']
})
export class JobConfigDetailComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  public jobConfig: JobConfig = new JobConfig();
  envvars: any;
  alive = true;
  loading: boolean;
  asyncJobs: Observable<any[]>;
  total: number;
  p = 1;
  jobConfigName: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    private jobService: JobService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.jobConfigName = params['jobConfigName'];
        this.getJobConfigDetail(this.jobConfigName);
      }
    );
    this.getPage(1);
  }

  public getJobConfigDetail(name: string) {
    this.jobService
      .getConfigByName(name)
      .subscribe(data => {
        this.jobConfig = data.json();
        this.envvars = this.jobConfig.envvars;
        console.log('jobconfig???', this.jobConfig)
      });
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncJobs = this.jobService.getJobList(5, page, this.jobConfigName)
      .do(res => {
        this.total = res.json()['count'];
        this.p = page;
        this.loading = false;
        // console.log('this.res: ', res);
        // console.log('this.total: ', this.total);
        // console.log('this.p', this.p);
        // console.log('this.items', res.json()['results']);
      })
      .map(res => res.json()['results']);
  }
}
