import React from 'react';
import LocalStorageInput from '../LocalStorageInput';
import styles from './TogglSettings.module.scss';

interface TogglSettingsProps {
  apiToken: string;
  userAgent: string;
  onApiTokenChange: (apiToken: string) => void;
  onUserAgentChange: (apiToken: string) => void;
}

function TogglSettings(props: TogglSettingsProps) {
  return (
    <div className={styles.root}>
      <h2>Toggl settings</h2>
      <main>
        <header>API token</header>
        <div className="row">
          <LocalStorageInput
            localStorageKey={'toggl-api-token'}
            value={props.apiToken}
            onChange={props.onApiTokenChange}
          />
          <a href="https://track.toggl.com/profile">Get API token</a>
        </div>
        <header>User agent</header>
        <div>
          <LocalStorageInput
            localStorageKey={'toggl-user-agent'}
            value={props.userAgent}
            onChange={props.onUserAgentChange}
            placeholder={'Toggl email'}
          />
        </div>
      </main>
    </div>
  );
}

export default TogglSettings;
