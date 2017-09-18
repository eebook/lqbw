import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService} from './../common/http.service';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

@Injectable()
export class JobService {
  constructor(private http: Http) {}

  public getConfigList(page_size, page_num): Observable<Response> {
    const url = '/ajax/job_configs?page_size=' + page_size + '&page=' + page_num;
    return this.http.get(url);
  }

  public getConfigByName(name): Observable<Response> {
    return this.http.get('/ajax/job_configs/' + name);
  }

  public deleteConfigByName(name): Observable<Response> {
    return this.http.delete('/ajax/job_configs/' + name);
  }

  public createConfig(payload): Observable<Response> {
    console.log('WTF????');
    return this.http.post('/ajax/job_configs/', payload);
  }

  public getJobList(page_size: number, page_num: number, name = ''): Observable<Response> {
    console.log('Get job list');
    let url = '/ajax/jobs?page_size=' + page_size + '&page=' + page_num;
    url = name.length > 0 ? url + '&config_name=' + name : url;
    return this.http.get(url);
  }

  public startJob(payload): Observable<Response> {
    console.log('Start a job');
    return this.http.post('/ajax/jobs/', payload);
  }

  public getJobDetail(job_uuid): Observable<Response> {
    console.log('Get a job detail');
    return this.http.get('/ajax/jobs/' + job_uuid);
  }

  public stopJob(job_uuid): Observable<Response> {
    console.log('Update a job');
    return this.http.put('/ajax/jobs/', job_uuid);
  }
}
