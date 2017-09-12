import { ModalService } from './../../../shared/modal/modal.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService, SimpleRequest } from './../../../common/http.service';
import { JobService } from './../../job.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

interface JobConfigResponse {
  items: string[];
  total: number;
}
interface IServerResponse {
  items: string[];
  total: number;
}

@Component({
  selector: 'app-job-config-list',
  templateUrl: './job-config-list.component.html',
  styleUrls: ['./job-config-list.component.scss'],
  providers: [
    HttpService,
    SimpleRequest,
  ]
})

export class JobConfigListComponent implements OnInit, OnDestroy {
  alive = true;
  loading: boolean;
  asyncJobConfigs: Observable<any[]>;
  total: number;
  p = 1;
  // msgs: Message[] = [];

  constructor(
    public job_service: JobService,
    private modalService: ModalService,
  ) {
  }

  ngOnDestroy() {
    // TODO: to unscript
    this.alive = false;
  }

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
    console.log('now page???' + page);
    console.log('now this.p?' + this.p);
    // TODO: Auto reload
    // Observable.interval(10000).takeWhile(_ => this.p !== page).subscribe(x => {
      this.asyncJobConfigs = this.job_service.getConfigList(5, page)
      .do(res => {
        this.total = res.json()['count'];
        this.p = page;
        this.loading = false;
        console.log('this.res: ', res);
        console.log('this.total: ', this.total);
        console.log('this.p', this.p);
        console.log('this.loading', this.loading);
        console.log('res.items', res.json()['results']);
      })
      .map(res => res.json()['results']);
    // });
  }

  public deleteClicked(jobConfig) {
    const value = jobConfig.config_name;
    console.log('value???', value);
    this.modalService
      .confirm('Delete', 'Are you sure you want to do this?')
      .subscribe(res => console.log(res));
  }

  public startClicked() {
    console.log('startClicked');
  }
}

