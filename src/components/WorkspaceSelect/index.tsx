import React, { memo } from 'react';
import { Workspace } from '../../types/toggl';

interface WorkspaceSelectProps {
  workspaces: Workspace[];
  workspaceId?: number;
  onChange: (workspaceId: number) => void;
}

function WorkspaceSelect(props: WorkspaceSelectProps) {
  return (
    <select
      id=""
      value={props.workspaceId || props.workspaces[0]?.id}
      onChange={(e) => props.onChange(Number(e.currentTarget.value))}
    >
      {props.workspaces.map((workspace) => (
        <option key={`workspace-option-${workspace.id}`} value={workspace.id}>
          {workspace.name}
        </option>
      ))}
    </select>
  );
}

export default memo(WorkspaceSelect);
