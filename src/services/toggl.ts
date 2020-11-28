import dateformat from 'dateformat';
import { EventEmitter } from 'events';
import groupBy from 'lodash-es/groupBy';
import values from 'lodash-es/values';
import { TypeSafeEventEmitter } from 'typesafe-event-emitter';
import {
  CreatedTimeEntry,
  CreateTimeEntryOptions,
  CreateTimeEntryParams,
  FetchTimeEntriesOptions,
  FetchTimeEntriesParams,
  Project,
  Report,
  TimeEntry,
  User,
  Workspace,
} from '../types/toggl';
import { getRequest, postRequest } from './http';

export function fetchWorkspaces() {
  return getRequest<Workspace[]>(
    'https://api.track.toggl.com/api/v8/workspaces'
  );
}
/**
 * @param workspaceId
 * @param options
 * @param page Not required
 * @param prevEntries Not required
 * @returns
 */
export async function fetchTimeEntries(
  workspaceId: number,
  options: FetchTimeEntriesOptions
) {
  // Setup parameters
  const since = dateformat(options.since, 'isoDate');
  const until = dateformat(options.until, 'isoDate');

  const params: FetchTimeEntriesParams = {
    user_agent: localStorage.getItem('toggl-user-agent') || '',
    workspace_id: workspaceId,
    billable: options.billable,
    since,
    until,
  };

  if (options.userIds) {
    const userIds = Array.isArray(options.userIds)
      ? options.userIds
      : [options.userIds];
    params.user_ids = userIds.map(Number);
  }

  // Fetch page count with first request
  const { data, total_count } = await getRequest<Report>(
    'https://api.track.toggl.com/reports/api/v2/details',
    params
  );

  const allEntries: TimeEntry[] = [];
  allEntries.push(...data);
  const pageCount = Math.ceil(total_count / 50);

  const emitter: TypeSafeEventEmitter<{
    currentPage: number;
    complete: TimeEntry[][];
  }> = new EventEmitter();

  (async () => {
    for (let page = 1; page <= pageCount; page++) {
      params.page = page;
      const { data: entries } = await getRequest<Report>(
        'https://api.track.toggl.com/reports/api/v2/details',
        params
      );
      allEntries.push(...entries);
      emitter.emit('currentPage', page);
    }
    emitter.emit(
      'complete',
      groupTimeEntriesByDay(
        allEntries.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
      )
    );
  })();

  return [emitter, pageCount] as const;
}

export function groupTimeEntriesByDay(timeEntries: TimeEntry[]) {
  const grouped = groupBy(timeEntries, (entry) => {
    const startTime = new Date(entry.start);
    return dateformat(startTime, 'isoDate');
  });

  return values(grouped);
}

interface UserRequest {
  data: User;
}

export async function getCurrentUser() {
  const { data } = await getRequest<UserRequest>(
    'https://api.track.toggl.com/api/v8/me'
  );
  return data;
}

export async function createTimeEntry(options: CreateTimeEntryOptions) {
  const startDate =
    typeof options.start === 'string' ? new Date(options.start) : options.start;
  const stopDate =
    typeof options.stop === 'string' ? new Date(options.stop) : options.stop;

  const { durationOnly, ...rest } = options;
  const params: CreateTimeEntryParams = {
    ...rest,
    duronly: options.durationOnly,
    duration: options.duration,
    created_with: 'toggl-workspace-mirrorer',
    start: startDate.toISOString(),
    stop: stopDate?.toISOString(),
  };

  const { data } = await postRequest<CreatedTimeEntry>(
    'https://api.track.toggl.com/api/v8/time_entries',
    {
      time_entry: params,
    }
  );
  return data;
}

export async function getWorkspaceProjects(workspaceId: number) {
  return getRequest<Project[]>(
    `https://api.track.toggl.com/api/v8/workspaces/${workspaceId}/projects`
  );
}
