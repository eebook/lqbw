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
}
