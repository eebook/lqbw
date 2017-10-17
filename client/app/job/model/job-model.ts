export class JobConfig {
  created_at: Date;
  updated_at: Date;
  config_name: string;
  schedule_rule: string;
}

export class JobDetail {
  created_at: Date;
  updated_at: Date;
  config_name: string;
  ended_at: Date;
}
