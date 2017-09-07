import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService, SimpleRequest } from './../common/http.service';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

@Injectable()
export class JobService {
  constructor(private http: SimpleRequest) {}

  public getConfigs(page_size, page_num): Observable<Response> {
    // return this.http.request('/ajax/job_config');
    return this.http.request('http://localhost:8084/ajax/job_configs');
  }

  public getConfigByName(name) {
      return this.http.request('/ajax/job_configs/', name);
  }
}
