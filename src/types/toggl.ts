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

export interface User {
  id: number;
  api_token: string;
  default_wid: number;
  email: string;
  fullname: string;
  jquery_timeofday_format: string;
  jquery_date_format: string;
  timeofday_format: string;
  date_format: string;
  store_start_and_stop_time: boolean;
  beginning_of_week: number;
  language: string;
  image_url: string;
  sidebar_piechart: boolean;
  at: Date;
  created_at: Date;
  retention: number;
  record_timeline: boolean;
  render_timeline: boolean;
  timeline_enabled: boolean;
  timeline_experiment: boolean;
  should_upgrade: boolean;
  achievements_enabled: boolean;
  timezone: string;
  openid_enabled: boolean;
  send_product_emails: boolean;
  send_weekly_report: boolean;
  send_timer_notifications: boolean;
  invitation: object;
  workspaces: Workspace[];
  duration_format: string;
}

export enum Billable {
  Yes = 'yes',
  No = 'no',
  Both = 'both',
}

export interface FetchTimeEntriesOptions {
  /**
   * A list of user IDs separated by a comma.
   **/
  userIds?: number | number[];
  /**
   * Is the time entry was billable or not
   */
  billable?: Billable;
  /**
   * ISO 8601 date (YYYY-MM-DD) format.
   * Defaults to today - 6 days
   *  */
  since: Date;
  /**
   * ISO 8601 date (YYYY-MM-DD) format.
   * Note: Maximum date span (until - since) is one year.
   * Defaults to today, unless since is in future or more than year ago, in this case until is since + 6 days.
   * */
  until: Date;
}

export interface FetchTimeEntriesParams {
  user_agent: string;
  workspace_id: number;
  since?: string;
  until?: string;
  page?: number;
  user_ids?: number[];
  billable?: Billable;
}

export interface CreateTimeEntryOptions {
  description: string;
  /**
   * Time entry start time, ISO 8601 date and time
   */
  start: Date | string;
  /**
   * Time entry stop time, ISO 8601 date and time
   */
  stop?: Date | string;
  /**
   * Time entry duration in seconds.
   */
  duration: number;
  /**
   * Should Toggl show the start and stop time of this time entry?
   */
  durationOnly?: boolean;
  /**
   * Timestamp that is sent in the response, indicates the time item was last updated
   */
  at?: string;
  /**
   * A list of tag names
   */
  tags?: string[];
  /**
   * Workspace ID
   */
  wid?: number;
  /**
   * Project ID
   */
  pid?: number;
  /**
   * Task ID
   */
  tid?: number;
  /**
   * Available for pro workspaces
   */
  billable?: boolean;
}

export interface CreateTimeEntryParams {
  description: string;
  created_with: string;
  start: string;
  duration: number;
  duronly?: boolean;
  at?: string;
  tags?: string[];
  wid?: number;
  pid?: number;
  tid?: number;
  billable?: boolean;
  stop?: string;
}

export interface CreatedTimeEntry {
  data: {
    id: number;
    pid: number;
    wid: number;
    billable: boolean;
    start: Date;
    duration: number;
    description: string;
    tags: string[];
  };
}

export interface Project {
  id: number;
  wid: number;
  cid: number;
  name: string;
  billable: boolean;
  is_private: boolean;
  active: boolean;
  at: string;
}
