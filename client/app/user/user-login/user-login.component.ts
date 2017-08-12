import { Textbox } from './../../common/dynamic-form/form-field/textbox';
import { Component, OnInit, Input, Injector } from '@angular/core';
import { Http, Response} from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FieldBase, Textbox, Image } from './../../common/dynamic-form/form-field';
import { fadeIn } from './../../animations/fade-in';
import { HttpService } from '../../common/http.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations: [ fadeIn ],
  providers: [ HttpService ]
})


export class UserLoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private injector: Injector,
    private http: HttpService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  @Input() fields: FieldBase<any>[] = [
    new Textbox({
      label: 'username',
      key: 'username',
      validators: [Validators.required]
    }),
    new Textbox({
      label: 'email',
      key: 'email',
      Validators: [Validators.required]
    }),
    new Textbox({
      label: 'password',
      key: 'password',
      type: 'password',
      Validators: [Validators.required]
    })
  ];

  // TODO: move to a service
  toFormGroup(fields: FieldBase<any>[]) {
    const group: any = {};

    fields.forEach(field => {
      group[field.key] = new FormControl(field.value || null, field.validators);
    });
    console.log(fields);
    return new FormGroup(group);
  }

  ngOnInit() {
    this.form = this.toFormGroup(this.fields);

    this.activateRoute.params.subscribe(
      params => {
        console.log('User login, activateRoute params:', params);
      }
    );
  }

  protected get injectorInstance() {
    return this.injector;
  }

  login() {
    console.log('The user is landing...');
  }

}
