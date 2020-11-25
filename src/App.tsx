import React from 'react';
import styles from './App.module.scss';
import DatePicker from './components/DatePicker';
import Spinner from './components/Spinner';
import TimeEntryTable from './components/TimeEntryTable';
import TogglSettings from './components/TogglSettings';
import WorkspaceSelect from './components/WorkspaceSelect';
import { getFirstDayOfMonth } from './services/date';
import { useToggl } from './services/useToggl';

function App() {
  const {
    apiToken,
    setApiToken,
    userAgent,
    setUserAgent,
    workspaces,
    timeEntries,
    fetchTimeEntries,
    setStartTime,
    setEndTime,
    settingsValid,
    sourceWorkspaceId,
    setSourceWorkspaceId,
    targetWorkspaceId,
    setTargetWorkspaceId,
  } = useToggl();

  return (
    <main className={styles.root}>
      <div>
        <TogglSettings
          apiToken={apiToken}
          onApiTokenChange={setApiToken}
          userAgent={userAgent}
          onUserAgentChange={setUserAgent}
        />

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

            <h2>Transfer time entries</h2>
            <p>Select workspaces</p>
            <div className={styles.row}>
              <WorkspaceSelect
                workspaces={workspaces}
                workspaceId={sourceWorkspaceId}
                onChange={setSourceWorkspaceId}
              />
              ➡️
              <WorkspaceSelect
                workspaces={workspaces}
                workspaceId={targetWorkspaceId}
                onChange={setTargetWorkspaceId}
              />
            </div>
            <br />
            <button
              onClick={() =>
                sourceWorkspaceId && fetchTimeEntries(sourceWorkspaceId)
              }
            >
              Get time entries
            </button>
          </>
        )}
      </div>
      <TimeEntryTable dailyEntries={timeEntries} />
    </main>
  );
}

export default App;
