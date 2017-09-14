import { JobService } from './../../job.service';
import { WidgetRegistry, Validator } from 'angular2-schema-form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-config-create',
  templateUrl: './job-config-create.component.html',
  styleUrls: ['./job-config-create.component.scss']
})
export class JobConfigCreateComponent implements OnInit {
  // The schema that will be used to generate a form
  schemaFromServer = {
    'properties': {
      'url': {
        'type': 'string',
        'description': 'The url of a website',
      },
      'name': {
        'type': 'string',
        'description': 'Config name',
      },
      'type': {
        'type': 'string',
        'description': 'The type of site'
      },
      'needAuth': {
        'type': 'boolean',
        'description': 'Whether you need to log in'
      },
      'timeout': {
        'type': 'string',
        'description': 'Timeout, in minutes'
      }
    },
    'required': ['url', 'type', 'needAuth'],
    'buttons': [{
      'label': 'Create',
      'id': 'create'
    }]
  };
  actions = {};

  constructor(
    public jobService: JobService,
  ) {
    this.actions['create'] = (property, options) => {
      console.log('WTF');
      const payload = {
        config_name: property.value.name,
        command_type: 'DEFAULT_COMMAND',
        command: '/run.sh',
        registry_index: 'index.alauda.cn',
        registry_name: 'alauda_public_registry',
        registry_project: 'alaudaorg',
        image_name: 'alaudaorg',
        image_tag: 'latest',
        envvars: [{
          name: 'env1',
          value: 'env1_value'
        }, {
          name: 'env2',
          value: 'env2_value'
        }],
        timeout: '120',
        cpu: 0.5,
        memory: 512,
        created_by: 'knarfeh',  // TODO: move to express
      };
      this.jobService.createConfig(payload)
        .subscribe(
          (data) => {
            console.log(data.json());
          },
          (error) => {
            console.log(error);
          }
        );

    };
    // console.log(this.actions);
  }

  ngOnInit() {
  }

}
