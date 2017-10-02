import { Component, OnInit, Input, Injector} from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FieldBase, Textbox, Image } from '../../common/dynamic-form/form-field';
import { fadeIn } from '../../animations/fade-in';
import { HttpService } from '../../common/http.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  animations: [ fadeIn ],
  providers: [ HttpService ]
})

export class UserRegisterComponent implements OnInit {
  githubClientId = 'd14320cfeb8f9c399e59';
  submitting = false;
  public form: FormGroup;

  constructor(
    private injector: Injector,
    private http: HttpService,
    // public http: Http,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  @Input() fields: FieldBase<any>[] = [
    new Textbox({
      label: 'username',
      id: 'username',
      key: 'username',
      validators: [Validators.required]
    }),
    new Textbox({
      label: 'email',
      id: 'email',
      key: 'email',
      validators: [Validators.required, Validators.email]
    }),
    new Textbox({
      label: 'password',
      type: 'password',
      id: 'password',
      key: 'password',
      validators: [Validators.required]
    })
  ];

  ngOnInit() {
    this.form = this.toFormGroup(this.fields);

    this.activateRoute.params.subscribe(
      params => {
        console.log('User registering, activateRoute params: ', params);
      }
    );
  }

  protected get injectorInstance() {
    return this.injector;
  }

  get registerDisabled() {
    return !this.form.valid || this.submitting;
  }

  toFormGroup(fields: FieldBase<any>[]) {
    const group: any = {};

    fields.forEach(field => {
      group[field.key] = new FormControl(field.value || null, field.validators);
    });
    console.log(fields);
    return new FormGroup(group);
  }

  register() {
    console.log('Registering...');
    if (this.registerDisabled) {
      return;
    }
    this.submitting = true;
    this.http.request('/auth/register', {
      method: 'POST',
      body: this.form.value
    }).then(() => {
      console.log('Successfully registerd...');
      return this.router.navigate(['register']);
    }).catch(errors => {
      if (errors instanceof Array) {
        console.log(errors);
      }
    }).then(() => {
      console.log('Submitting is false now');
      this.submitting = false;
    });
  }

  loginWithGithub() {
    console.log('The user is landing...');
    this.submitting = true;

    this.http.request('/auth/github/', {
      method: 'GET',
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
