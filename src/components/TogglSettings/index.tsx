import React from 'react';
import LocalStorageInput from '../LocalStorageInput';

interface TogglSettingsProps {
  apiToken: string;
  userAgent: string;
  onApiTokenChange: (apiToken: string) => void;
  onUserAgentChange: (apiToken: string) => void;
}

function TogglSettings(props: TogglSettingsProps) {
  return (
    <div>
      <h2>Toggl API token</h2>
      <table>
        <thead>
          <tr>
            <td>API token</td>
            <td>User agent</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <LocalStorageInput
                localStorageKey={'toggl-api-token'}
                value={props.apiToken}
                onChange={props.onApiTokenChange}
              />
            </td>
            <td>
              <LocalStorageInput
                localStorageKey={'toggl-user-agent'}
                value={props.userAgent}
                onChange={props.onUserAgentChange}
                placeholder={'Toggl email'}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <a href="https://track.toggl.com/profile">Get API token</a>
    </div>
  );
}

export default TogglSettings;
