import { useEffect, useState } from 'react';
import { TimeEntry, Workspace } from '../types/toggl';
import * as toggl from './toggl';
import { fetchWorkspaces } from './toggl';

const API_TOKEN_REGEX = /[a-z0-9]{32}/;

export function useToggl() {
  const [apiToken, setApiToken] = useState(
    localStorage.getItem('toggl-api-token') || ''
  );
  const [userAgent, setUserAgent] = useState(
    localStorage.getItem('toggl-user-agent') || ''
  );

  const [workspaces, setWorkspaces] = useState<Workspace[]>();
  const [sourceWorkspaceId, setSourceWorkspaceId] = useState<number>();
  const [targetWorkspaceId, setTargetWorkspaceId] = useState<number>();

  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[][]>([]);

  const apiTokenIsValid = API_TOKEN_REGEX.test(apiToken);
  const settingsValid = apiTokenIsValid && userAgent !== '';

  useEffect(() => {
    if (!workspaces && settingsValid) {
      (async () => {
        const workspaces = await fetchWorkspaces();
        setWorkspaces(workspaces);
        setTargetWorkspaceId(workspaces[0].id);
        setSourceWorkspaceId(workspaces[1].id);
      })();
    }

    if (workspaces && !settingsValid) {
      setWorkspaces(undefined);
    }
  }, [apiToken, settingsValid]);

  const fetchTimeEntries = async (workspaceId: number) => {
    const newEntries = await toggl.fetchTimeEntries(workspaceId, {
      since: startTime,
      until: endTime,
    });
    setTimeEntries(newEntries);
  };

  return {
    settingsValid,
    apiToken,
    setApiToken,
    userAgent,
    setUserAgent,
    workspaces,
    setWorkspaces,
    timeEntries,
    fetchTimeEntries,
    setStartTime,
    setEndTime,
    sourceWorkspaceId,
    setSourceWorkspaceId,
    targetWorkspaceId,
    setTargetWorkspaceId,
  };
}
