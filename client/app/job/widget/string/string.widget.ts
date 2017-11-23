import { Component } from '@angular/core';
import { StringWidget } from 'angular2-schema-form';

@Component({
  selector: 'mdl-sf-string-widget',
  template: `
  <mat-form-field>
    <input matInput type="string" floating-label
    [placeholder]="schema.title"
    [name]="name"
    [attr.readonly]="schema.readOnly?true:null"
    [attr.id]="id"
    [attr.disabled]="schema.readOnly?true:null"
    [formControl]="control" />
  </mat-form-field>
  `
})
export class MyStringWidget extends StringWidget {

}
