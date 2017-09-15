export class JobConfig {
  created_at: Date;
  updated_at: Date;
  config_name: string;
  schedule_rule: string;
}

export class Job {
  created_at: Date;
  updated_at: Date;
  config_name: string;
}
