import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  navMenu: Object[] = [{
    title: 'Profile',
    route: '/',
    icon: 'dashboard',
  }, {
    title: 'Account',
    route: '/settings/account',
    icon: 'dashboard',
  }, {
    title: 'Notification',
    route: '/settings/notification',
    icon: 'dashboard',
  }, {
    title: 'Books',
    route: '/settings/books',
    icon: 'books',
  }];

  constructor() { }

  ngOnInit() {
  }

}
