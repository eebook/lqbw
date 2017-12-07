import { ActivatedRoute } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from './../../common/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['./user-activate.component.scss']
})
export class UserActivate implements OnInit {
  code: string;

  constructor(
    private _route: ActivatedRoute,
    private _http: HttpService,
    private _snackBar: MatSnackBar,
    private _loadingService: TdLoadingService
  ) { }

  ngOnInit() {
    this._loadingService.register('activate.success')
    this.code = this._route.snapshot.params['code'];
    this._http.request('/ajax/auth/activate/'+this.code, {
      method: 'PUT',
    }).then((result) => {
      this._loadingService.resolve('activate.success')
    }).catch((errors: any[]) => {
      this._loadingService.resolve('activate.success')
      console.log('errors???', errors);
      if (errors[0].code === 'invalid_args') {
        this._snackBar.open(errors[0].fields[0].captcha[0], 'Error', {
          duration: 5000,
        });
      }
    }).then(() => {
    });
  }

}
