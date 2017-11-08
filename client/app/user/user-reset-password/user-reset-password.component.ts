import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent implements OnInit {
  submitting: boolean;
  account: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router

  ) { }

  ngOnInit() {
    this.account = this._route.snapshot.params['account'];
    console.log('account???', this.account);
    
  }

}
