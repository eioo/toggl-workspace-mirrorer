export interface Report {
  total_grand: number;
  total_billable: number;
  total_currencies: any;
  total_count: number;
  per_page: number;
  data: TimeEntry[];
}

export interface TimeEntry {
  id: number;
  pid: number;
  tid: number;
  uid: number;
  description: string;
  start: string;
  end: string;
  updated: string;
  dur: number;
  user: string;
  use_stop: boolean;
  client: string;
  project: string;
  project_color: string;
  project_hex_color: string;
  task: string;
  billable: null;
  is_billable: boolean;
  cur: null;
  tags: any[];
}

export interface Workspace {
  id: number;
  name: string;
  profile: number;
  premium: boolean;
  admin: boolean;
  default_currency: string;
  only_admins_may_create_projects: boolean;
  only_admins_see_billable_rates: boolean;
  only_admins_see_team_dashboard: boolean;
  projects_billable_by_default: boolean;
  rounding: number;
  rounding_minutes: number;
  at: string;
  logo_url: string;
  ical_url: string;
  ical_enabled: boolean;
}
