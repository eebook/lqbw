import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService, SimpleRequest } from './../common/http.service';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

@Injectable()
export class JobService {
  constructor(
    private _http: Http,
    private _promiseHttp: HttpService) {}

  public getConfigList(page_size, page_num): Observable<Response> {
    const url = '/ajax/job_configs?page_size=' + page_size + '&page=' + page_num;
    return this._http.get(url);
  }

  public getConfigByName(name): Observable<Response> {
    return this._http.get('/ajax/job_configs/' + name)
      .catch(this.handleError);
  }

  public checkConfigName(name): Observable<Response> {
    return this._http.get('/ajax/job_configs/' + name + '/exist');
  }

  public deleteConfigByName(name): Promise<any> {
    // return this._http.delete('/ajax/job_configs/' + name);
    return this._promiseHttp.request('/ajax/job_configs/' + name, {method: 'DELETE'});
  }

  public createConfig(payload): Observable<Response> {
    return this._http.post('/ajax/job_configs/', payload);
  }

  public getJobList(page_size: number, page_num: number, name = ''): Observable<Response> {
    console.log('Get job list');
    let url = '/ajax/jobs?page_size=' + page_size + '&page=' + page_num;
    url = name.length > 0 ? url + '&config_name=' + name : url;
    return this._http.get(url);
  }

  // Jobs operation
  public startJob(payload): Promise<any> {
    console.log('Start a job');
    // return this._http.post('/ajax/jobs/', payload);
    return this._promiseHttp.request('/ajax/jobs/', {method: 'POST', body: payload});
  }

  public deleteJobById(jobUUID): Promise<any> {
    return this._promiseHttp.request('/ajax/jobs/' + jobUUID, {method: 'DELETE'});
  }

  public getJobDetail(jobUUID): Observable<Response> {
    console.log('Get a job detail');
    return this._http.get('/ajax/jobs/' + jobUUID);
  }

  public stopJob(jobUUID): Observable<Response> {
    console.log('Update a job');
    return this._http.put('/ajax/jobs/', jobUUID);
  }

  public getJobLogs(jobUUID: string, page: number, startTime: number, endTime: number): Promise<any> {
    const url = '/ajax/jobs/' + jobUUID + '/logs/?start_time=' + startTime + '&end_time=' + endTime;
    return this._promiseHttp.request(url, {method: 'GET'});
  }

  public getUrlMetaData(url): Observable<Response> {
    return this._http.post('/ajax/url_metadata', {'url': url})
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
