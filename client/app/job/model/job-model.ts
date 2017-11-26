export class JobConfig {
  created_at: Date;
  updated_at: Date;
  config_name: string;
  created_by: string;
  image_name: string;
  image_tag: string;
  envvars: any;
}

export class JobDetail {
  created_at: Date;
  updated_at: Date;
  config_name: string;
  ended_at: Date;
}
