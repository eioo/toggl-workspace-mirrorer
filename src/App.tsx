import React, { useCallback } from 'react';
import styles from './App.module.scss';
import DatePicker from './components/DatePicker';
import Spinner from './components/Spinner';
import TimeEntryList from './components/TimeEntryList';
import TimeEntrySettings from './components/TimeEntrySettings';
import TogglSettings from './components/TogglSettings';
import UserDetails from './components/UserDetails';
import { getFirstDayOfMonth } from './services/date';
import { useToggl } from './services/useToggl';

function App() {
  const {
    apiToken,
    setApiToken,
    userAgent,
    setUserAgent,
    workspaces,
    workspaceProjects,
    timeEntries,
    fetchTimeEntries,
    setStartTime,
    setEndTime,
    setBillable,
    settingsValid,
    sourceWorkspaceId,
    setSourceWorkspaceId,
    targetWorkspaceId,
    setTargetWorkspaceId,
    currentPage,
    pageCount,
    currentUser,
    selectedProjectId,
    setSelectedProjectId,
    mirrorEntries,
    mirroredDays,
  } = useToggl();

  const onSourceWorkspaceIdChange = useCallback(setSourceWorkspaceId, [
    sourceWorkspaceId,
  ]);
  const onTargetWorkspaceIdChange = useCallback(setTargetWorkspaceId, [
    targetWorkspaceId,
  ]);
  const onProjectIdChange = useCallback(setSelectedProjectId, [
    selectedProjectId,
  ]);
  const onBillableChange = useCallback(setBillable, []);

  return (
    <main className={styles.root}>
      <div>
        <TogglSettings
          apiToken={apiToken}
          onApiTokenChange={setApiToken}
          userAgent={userAgent}
          onUserAgentChange={setUserAgent}
        />

        <UserDetails user={currentUser} />

        {!settingsValid ? null : !workspaces ? (
          <Spinner />
        ) : (
          <>
            <h2>Time picker</h2>
            <table>
              <thead>
                <tr>
                  <td>First day</td>
                  <td>Last day</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <DatePicker
                      onChange={setStartTime}
                      defaultValue={getFirstDayOfMonth()}
                    />
                  </td>
                  <td>
                    <DatePicker onChange={setEndTime} />
                  </td>
                </tr>
              </tbody>
            </table>

            <TimeEntrySettings
              workspaces={workspaces}
              workspaceProjects={workspaceProjects}
              selectedProjectId={selectedProjectId}
              sourceWorkspaceId={sourceWorkspaceId}
              targetWorkspaceId={targetWorkspaceId}
              onProjectIdChange={onProjectIdChange}
              onSourceWorkspaceIdChange={onSourceWorkspaceIdChange}
              onTargetWorkspaceIdChange={onTargetWorkspaceIdChange}
              onBillableChange={onBillableChange}
            />
            <button
              onClick={() =>
                sourceWorkspaceId && fetchTimeEntries(sourceWorkspaceId)
              }
            >
              Get time entries
            </button>
            <button disabled={timeEntries.length === 0} onClick={mirrorEntries}>
              Mirror time entries
            </button>
          </>
        )}
      </div>
      <div>
        <TimeEntryList
          mirroredDays={mirroredDays}
          dailyEntries={timeEntries}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      </div>
    </main>
  );
}

export default App;
