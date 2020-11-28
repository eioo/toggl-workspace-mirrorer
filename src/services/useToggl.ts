import dateformat from 'dateformat';
import { sumBy, uniq } from 'lodash-es';
import { useEffect, useState } from 'react';
import { Billable, Project, TimeEntry, User, Workspace } from '../types/toggl';
import { getFirstDayOfMonth, getLastDayOfMonth } from './date';
import * as toggl from './toggl';
import { fetchWorkspaces } from './toggl';

const API_TOKEN_REGEX = /[a-z0-9]{32}/;

export function useToggl() {
  // Settings
  const [apiToken, setApiToken] = useState(
    localStorage.getItem('toggl-api-token') || ''
  );
  useEffect(() => {
    localStorage.setItem('toggl-api-token', apiToken);
  }, [apiToken]);

  const [userAgent, setUserAgent] = useState(
    localStorage.getItem('toggl-user-agent') || ''
  );
  useEffect(() => {
    localStorage.setItem('toggl-user-agent', userAgent);
  }, [userAgent]);

  const apiTokenIsValid = API_TOKEN_REGEX.test(apiToken);
  const settingsValid = apiTokenIsValid && userAgent !== '';

  const [currentPage, setCurrentPage] = useState<number>();
  const [pageCount, setPageCount] = useState<number>();

  // User
  const [currentUser, setCurrentUser] = useState<User>();

  // Projects
  const [workspaceProjects, setWorkspaceProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number>();

  // Workspaces
  const [workspaces, setWorkspaces] = useState<Workspace[]>();
  const [sourceWorkspaceId, setSourceWorkspaceId] = useState<number>();
  const [targetWorkspaceId, setTargetWorkspaceId] = useState<number>();

  // ISO dates yyyy-mm-dd
  const [mirroredDays, setMirroredDays] = useState(new Set<string>());

  // Time
  const [startTime, setStartTime] = useState<Date>(getFirstDayOfMonth());
  const [endTime, setEndTime] = useState<Date>(getLastDayOfMonth());
  const [timeEntries, setTimeEntries] = useState<TimeEntry[][]>([]);

  // Time entry fetch options
  const [billable, setBillable] = useState(Billable.Both);

  useEffect(() => {
    toggl.getCurrentUser().then(setCurrentUser);

    if (!workspaces && settingsValid) {
      fetchWorkspaces().then((newWorkspaces) => {
        setWorkspaces(newWorkspaces);
        setTargetWorkspaceId(newWorkspaces[1].id);
        setSourceWorkspaceId(newWorkspaces[0].id);
      });
    }

    if (workspaces && !settingsValid) {
      setWorkspaces(undefined);
      setCurrentUser(undefined);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [apiToken, settingsValid]);

  useEffect(() => {
    if (targetWorkspaceId) {
      toggl.getWorkspaceProjects(targetWorkspaceId).then((data) => {
        setSelectedProjectId(data[0].id);
        setWorkspaceProjects(data);
      });
    }
  }, [targetWorkspaceId]);

  const fetchTimeEntries = async (workspaceId: number) => {
    if (!currentUser) {
      return;
    }

    setMirroredDays(new Set());
    setTimeEntries([]);
    setPageCount(undefined);
    setCurrentPage(undefined);

    const [events, pageCount] = await toggl.fetchTimeEntries(workspaceId, {
      userIds: [currentUser.id, currentUser.id],
      since: startTime,
      until: endTime,
      billable,
    });

    setCurrentPage(1);
    setPageCount(pageCount);
    events.on('currentPage', setCurrentPage);
    events.on('complete', setTimeEntries);
  };

  const createTimeEntry = () => {
    const entry = timeEntries[0][0];

    toggl.createTimeEntry({
      description: 'TEST' + entry.description,
      start: entry.start,
      duration: entry.dur / 1000,
      wid: workspaces?.find((w) => w.id === targetWorkspaceId)?.id,
    });
  };

  const mirrorEntries = async () => {
    for (const dailyEntries of timeEntries) {
      const totalDuration = sumBy(dailyEntries, (entry) => entry.dur) / 1000;
      const startDate = new Date(dailyEntries[0].start);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);

      await toggl.createTimeEntry({
        description: uniq(dailyEntries.map((entry) => entry.description))
          .sort()
          .join('\n\n'),
        start: startDate,
        duration: totalDuration,
        wid: workspaces?.find((w) => w.id === targetWorkspaceId)?.id,
        pid: selectedProjectId,
      });

      for (const entry of dailyEntries) {
        setMirroredDays((old) => {
          const newSet = new Set(old);
          newSet.add(dateformat(new Date(entry.start), 'isoDate'));
          return newSet;
        });
      }
    }
  };

  return {
    apiToken,
    createTimeEntry,
    currentPage,
    currentUser,
    fetchTimeEntries,
    mirroredDays,
    mirrorEntries,
    pageCount,
    selectedProjectId,
    setApiToken,
    setBillable,
    setEndTime,
    setSelectedProjectId,
    setSourceWorkspaceId,
    setStartTime,
    setTargetWorkspaceId,
    settingsValid,
    setUserAgent,
    setWorkspaces,
    sourceWorkspaceId,
    targetWorkspaceId,
    timeEntries,
    userAgent,
    workspaceProjects,
    workspaces,
  };
}
