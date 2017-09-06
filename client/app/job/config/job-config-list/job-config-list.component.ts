import { Observable } from 'rxjs/Rx';
import { HttpService, SimpleRequest } from './../../../common/http.service';
// import { JobService } from './../../job.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-job-config-list',
  templateUrl: './job-config-list.component.html',
  styleUrls: ['./job-config-list.component.scss'],
  providers: [ HttpService, SimpleRequest ]
})

export class JobConfigListComponent implements OnInit, OnDestroy {
  alive = true;
  private timer: Observable<number>;

  constructor(
    // private job_service: JobService,
    private http: SimpleRequest,
  ) {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
    // this.http.request('/ajax/job_configs', {
    //   method: 'GET',
    // }).then(result => {
    //   console.log('result', result);
    // }).catch(errors => {
    //   console.log(errors);
    // });
    // const result1 = await this.http.request('/ajax/job_configs');
    // console.log('result1', result1);
    this.http.request('/ajax/job_configs').subscribe(res => {
      console.log('result???', res.json());
    });
    Observable.interval(20000).subscribe(x => {
      this.http.request('/ajax/job_configs').subscribe(res => {
        console.log('result???', res.json());
      });
    });
    this._startPollTimer();
  }

  public _startPollTimer() {
    this._delay(50000);
    console.log('lalala');
    setTimeout(() => console.log('asdfsd'), 2000);
    console.log('lalala');
  }

  private _delay($timeout) {
    return (milliseconds) => {
      return new Promise(res => {
        return $timeout(res, milliseconds);
      });
    };
  }

}
