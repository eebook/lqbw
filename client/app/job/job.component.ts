import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  navMenu: Object[] = [{
    title: 'Config',
    route: '/job/config/list',
    icon: 'dashboard',
  }, {
    title: 'History',
    route: '/job/history/list',
    icon: 'dashboard',
  }];

  constructor() { }

  ngOnInit() {
  }

}
