import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { TdDialogService, TdLoadingService } from '@covalent/core';
import { StepState } from '@covalent/core';

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
  activeDeactiveStep1Msg = 'No select/deselect detected yet';
  stateStep1: StepState = StepState.Required;
  stateStep2: StepState = StepState.Required;
  stateStep3: StepState = StepState.Complete;
  disabled = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService
  ) {}

  toggleRequiredStep1(): void {
    this.stateStep1 = (this.stateStep1 === StepState.Required ? StepState.None : StepState.Required);
  }

  toggleRequiredStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  }

  toggleCompleteStep3(): void {
    this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  activeStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Active event emitted.';
    console.log('activestep');
  }

  deactiveStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Deactive event emitted.';
    console.log('deactivate');
  }

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
