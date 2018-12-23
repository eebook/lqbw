import { JobService } from './../../job.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TdDialogService, TdLoadingService, StepState } from '@covalent/core';



@Component({
  selector: 'app-job-config-create',
  templateUrl: './job-config-create.component.html',
  styleUrls: ['./job-config-create.component.scss'],
})
export class JobConfigCreateComponent implements OnInit {
  id: string;
  url: string;
  action: string;
  jobName: string;
  activeDeactiveStep1Msg = 'No select/deselect detected yet';
  step1Active = true;
  stateStep1: StepState = StepState.Required;
  stateStep2: StepState = StepState.Required;
  step2Disabled = false;
  step2Active = false;
  repo: string;

  urlFormControl = new FormControl('', [
    Validators.required
  ]);
  jobNameFormControl = new FormControl('', [
    Validators.required
  ]);
  basicInfoControlGroup = new FormGroup({
    urlFormControl: this.urlFormControl,
    jobNameFormControl: this.jobNameFormControl
  });

  metaData: any;
  urlSchema: any;
  value: any = {};

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _jobService: JobService
  ) {
  }

  inputBasicInfo(url: string, name: string): void {
    // this.stateStep1 = (this.stateStep1 === StepState.Required ? StepState.None : StepState.Required);
    // TODO: this is a bug, should merge result of urlmetadata and nameexist result
    this.step2Disabled = false;
    this._getUrlMetadata(url);
    this._checkNameExist(name);
  }

  private _getUrlMetadata(url: string) {
    this._jobService
      .getUrlMetaData(url)
      .subscribe(
        (res) => {
          this.metaData = res;
          this.urlSchema = this.metaData.result.schema;
          this.repo = this.metaData.result.repo;
          this.stateStep1 = StepState.None;
          this.step1Active = false;
          this.step2Active = true;
          this.stateStep2 = StepState.Required;
        },
        (err) => {
          this.stateStep1 = StepState.Required;
          this.step1Active = true;
          this.step2Active = false;
          const errors = err.json().errors;
          this._snackBarService.open(errors[0].message, 'Error', {duration: 3000, politeness: 'polite'});
        },
        () => {
          console.log('Done');
        }
      );
  }

  private _checkNameExist(name: string) {
    this._jobService
      .checkConfigName(name)
      .subscribe(
        (res) => {  // Name already exist
          this.stateStep1 = StepState.Required;
          this.step1Active = true;
          this.step2Active = false;
          this._snackBarService.open('Job config name is already in use.', 'Error', {duration: 3000, politeness: 'polite'});
        },
        (err) => {
          const errors = err.json().errors;
          console.log('Check name exist, error %j', errors);
          if (errors[0].code === 'resource_not_exist') {
          } else {
            this._snackBarService.open(errors[0].message, 'Error', {duration: 3000, politeness: 'polite'});
          }
        },
        () => {
          console.log('Done');
        }
      );
  }

  toggleStep1() {
    return false;
  }

  toggleStep2() {
    return true;
  }

  toggleRequiredStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  }

  activeStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Active event emitted.';
    console.log('activestep');
    this.stateStep2 = StepState.None;
    this.step1Active = true;
    this.step2Active = false;
  }

  deactiveStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Deactive event emitted.';
    this.stateStep1 = StepState.None;
    console.log('deactivate');
  }

  goBack(): void {
    this._router.navigate(['/job/config']);
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    // this._route.params.subscribe((params: {id: string}) => {
    //   this.id = params.id;
    //   if (this.id) {
    //     // this.load();
    //   }
    // });
    this.step2Disabled = true;
  }

  create(url: string, name: string): void {
    const payload = {
      config_name: name,
      image_name: this.metaData.result.image,
      image_tag: this.metaData.result.image_version,
      envvars: [{
        name: 'URL',
        value: url
      }, {
        name: 'REPO',
        value: this.repo
      }, {
        name: 'ES_INDEX',
        value: this.metaData.result.name
      }]
    };
    for (const key in Object.keys(this.value)) {
      if (this.value.hasOwnProperty(key)) {
        payload.envvars.push({name: key, value: this.value[key]});
      }
    }
    this._loadingService.register('create.job');
    this._jobService.createConfig(payload)
      .subscribe(
        (data) => {
          console.log('create job config: ', data.json());
          // TODO: jump jump
          this._loadingService.resolve('create.job');
          this._router.navigate(['/job/config/detail', name]);
        },
        (error) => {
          this._snackBarService.open(error.json().message, 'Create', {
            duration: 2000,
          });
        }
      );
  }

}
