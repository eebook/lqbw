import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService, SimpleRequest } from './../common/http.service';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

@Injectable()
export class JobService {
  constructor(private http: SimpleRequest) {}

  public getConfigs(page_size, page_num): Observable<Response> {
    const url = '/ajax/job_config?page_size=' + page_size + '&page_num=' + page_num;
    return this.http.request(url);
  }

  public getConfigByName(name) {
      return this.http.request('/ajax/job_configs/', name);
  }
}
