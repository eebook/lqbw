import { CommonModule } from './../../common/common.module';
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
  submitting = false;
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
      value: 'knarfeh',
      validators: [Validators.required]
    }),
    new Textbox({
      label: 'email',
      key: 'email',
      value: 'knarfeh@outlook.com',
      Validators: [Validators.required]
    }),
    new Textbox({
      label: 'password',
      key: 'password',
      type: 'password',
      value: 'knarfehknarfeh',
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

  get loginDisabled() {
    return !this.form.valid || this.submitting;
  }

  login() {
    console.log('The user is landing...');
    if (this.loginDisabled) {
      return;
    }
    this.submitting = true;

    this.http.request('/ajax/auth/login', {
      method: 'POST',
      body: this.form.value
    }).then(({ result }) => {
      console.log('Login result: ', result);
      console.log('Successfully login...');
      localStorage.setItem('currentUser', JSON.stringify({'userName': result.username}));
      return this.router.navigate(['bookstore']);
    }).catch(errors => {
      if (errors instanceof Array) {
        console.log(errors);
      }
    }).then(() => {
      console.log('Submitting is false now');
      this.submitting = false;
    });
  }
}
