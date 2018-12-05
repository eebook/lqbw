import { Injectable } from '@angular/core';
import { Http, RequestMethod, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { TimeoutError } from 'rxjs/util/TimeoutError';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';

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


function safeErrorResponseJson(response: Response): { errors: [any] } {
  try {
    return response.json();
  } catch (e) {
    return { errors: [{ 'code': 'unknown_issue', 'message': response.text() }] };
  }
}


@Injectable()
export class HttpService {
  static buildURLSearchParams(params: any): URLSearchParams {
    const urlSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, value);
    });
    return urlSearchParams;
  }

  constructor(
    public _http: Http,
  ) {
  }

  /**
   * Wraps Angular http service:
   *   - Add new headers
   *   - Handle exceptions
   *   - Handle timeout
   * @param url
   * @param options
   * @returns {Promise<any>}
   */
  public request(url: string, options: RequestOptionsArgs = { method: 'GET' }): Promise<any> {
    return this._http.request(url, options)
      .timeout(TIMEOUT_IN_MS)
      .toPromise()
      .then(res => {
        return res.text() ? res.json() : {};
      })
      .catch(error => {
        let errors: ErrorResponse['errors'];
        if (error instanceof Response) {
          if (error.status === 0) {
            errors = [{ code: 'network_issue' }];
          } else {
            errors = safeErrorResponseJson(error).errors;
          }
        } else if (error instanceof TimeoutError) {
          errors = [{ code: 'timeout_error' }];
          if (options.method !== 'GET') {
            // this.toast.showMessageToast({
            //   type: ToastType.Error,
            //   message: this.translate.get('timeout_error')
            // });
          }
        } else {
          errors = [{ code: 'unknown_issue', message: error.toString() }];
        }
        throw errors;
      });
  }
}

@Injectable()
export class SimpleRequest {
  constructor(
    public _http: Http
  ) {

  }
  request(url: string, options: RequestOptionsArgs = { method: 'GET' }) {
    return this._http.request(url, options);
  }
}

