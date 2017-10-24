import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { TdDialogService, TdLoadingService } from '@covalent/core';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-job-config-create',
  templateUrl: './job-config-create.component.html',
  styleUrls: ['./job-config-create.component.scss'],
})
export class JobConfigCreateComponent implements OnInit {
  displayName: string;
  email: string;
  id: string;
  admin: boolean;
  action: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService) {}

  goBack(): void {
    this._router.navigate(['/job/config']);
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: {id: string}) => {
      this.id = params.id;
      if (this.id) {
        // this.load();
      }
    });
  }

  create(): void {
    console.log('create job');
  }

}
