import dateformat from 'dateformat';
import groupBy from 'lodash-es/groupBy';
import values from 'lodash-es/values';
import { Report, TimeEntry, Workspace } from '../types/toggl';
import { makeRequest } from './http';

export function fetchWorkspaces() {
  return makeRequest<Workspace[]>(
    'https://api.track.toggl.com/api/v8/workspaces'
  );
}

interface FetchTimeEntriesParams {
  user_agent: string;
  workspace_id: number;
  since?: string;
  until?: string;
  page?: number;
}

export async function fetchTimeEntries(
  workspaceId: number,
  options: {
    since?: Date;
    until?: Date;
  } = {}
) {
  // Setup parameters
  const since = options.since
    ? dateformat(options.since, 'isoDate')
    : undefined;
  const until = options.until
    ? dateformat(options.until, 'isoDate')
    : undefined;

  const params: FetchTimeEntriesParams = {
    user_agent: localStorage.getItem('toggl-user-agent') || '',
    workspace_id: workspaceId,
    since,
    until,
  };

  const allEntries: TimeEntry[] = [];

  // Fetch page count with first request
  const { data, total_count } = await makeRequest<Report>(
    'https://api.track.toggl.com/reports/api/v2/details',
    params
  );
  allEntries.push(...data);
  const pageCount = Math.ceil(total_count / 50);

  for (let page = 1; page < pageCount; page++) {
    params.page = page;
    const res = await makeRequest<Report>(
      'https://api.track.toggl.com/reports/api/v2/details',
      params
    );
    allEntries.push(...res.data);
  }

  return groupTimeEntriesByDay(allEntries);
}

export function groupTimeEntriesByDay(timeEntries: TimeEntry[]) {
  const grouped = groupBy(timeEntries, (entry) => {
    const startTime = new Date(entry.start);
    return dateformat(startTime, 'isoDate');
  });

  return values(grouped);
}
