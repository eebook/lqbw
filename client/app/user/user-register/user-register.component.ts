import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FieldBase, Textbox, Image } from '../../common/dynamic-form/form-field';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})

export class UserRegisterComponent implements OnInit {
  submitting = false;
  public form: FormGroup;

  get registerDisabled() {
    return !this.form.valid || this.submitting;
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
      validators: [Validators.required, Validators.email]
    })
  ];

  constructor(public router: Router,
    public activateRoute: ActivatedRoute ) {
  }

  ngOnInit() {
    this.form = this.toFormGroup(this.fields);

    this.activateRoute.params.subscribe(
      params => {
        console.log(params);
      }
    );
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
    if (this.registerDisabled) {
      return;
    }
    this.submitting = true;

    console.log(this.form);
    console.log(this.form.value);
  }
}
