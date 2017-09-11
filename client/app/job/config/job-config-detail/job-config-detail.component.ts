import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-config-detail',
  templateUrl: './job-config-detail.component.html',
  styleUrls: ['./job-config-detail.component.scss']
})
export class JobConfigDetailComponent implements OnInit {

  constructor(public activeRoute: ActivatedRoute ) {
    console.log('Constructor of JobConfigDetail');
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => console.log(params['jobConfigName'])
    );
  }

  public getJobConfigDetail(name: string) {
    console.log('TODO');
  }

}
