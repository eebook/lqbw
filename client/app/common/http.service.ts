import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { TimeoutError } from 'rxjs/util/TimeoutError';

const TIMEOUT_IN_MS = 30000;   // 30 seconds

/**
 * Mimic error response object between Lqbw and Gryu(EEBookErrorReponse)
 */
interface ErrorResponse {
  errors: [{
    code: string,
    source?: number,
    message?: string,
    fields?: any
  }];
  status_code: number;
}


function safeErrorReponseJson(response: Response): { errors: [any] } {
  try {
    return response.json();
  } catch (e) {
    return { errors: [{ 'code': 'unknown_issue', 'message': response.text() }] };
  }
}


/**
 * Utility function for fetching XHL requests
 */
@Injectable()
export class HttpService {
  static buildURLSearchParams(params: any): URLSearchParams {
    const urlSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, value);
    });
    return urlSearchParams;
  }

  constructor(private http: Http, ) {
  }

  /**
   * Wraps Angular http service:
   *   - Add new headers
   *   - Map Observable to Promise
   *   - Handle exceptions
   *   - Handle timeout
   * @param url
   * @param options
   * @returns {Promise<any>}
   */
  return(url: string, options: RequestOptionsArgs = { method: 'GET' }): Promise<any> {
      return this.http.request(url, options)
        .timeout(TIMEOUT_IN_MS)
        .toPromise()
        .then(res => res.json())
        .catch(error => {

      });
  }
}



