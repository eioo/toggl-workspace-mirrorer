import React, { memo, useState } from 'react';
import arrowRight from '../../assets/arrow-right.svg';
import { Billable, Project, Workspace } from '../../types/toggl';
import WorkspaceSelect from '../WorkspaceSelect';
import styles from './TimeEntrySettings.module.scss';

interface TimeEntrySettingsProps {
  workspaces: Workspace[];
  workspaceProjects: Project[];
  sourceWorkspaceId: number | undefined;
  targetWorkspaceId: number | undefined;
  selectedProjectId: number | undefined;
  onSourceWorkspaceIdChange: (workspaceId: number) => void;
  onTargetWorkspaceIdChange: (workspaceId: number) => void;
  onProjectIdChange: (projectId: number) => void;
  onBillableChange: (isBillable: Billable) => void;
}

function TimeEntrySettings(props: TimeEntrySettingsProps) {
  const [billable, setBillable] = useState(Billable.Both);

  return (
    <div className={styles.root}>
      <h2>Transfer time entries</h2>
      <p>Select workspaces</p>
      <div className="row">
        <WorkspaceSelect
          workspaces={props.workspaces}
          workspaceId={props.sourceWorkspaceId}
          onChange={props.onSourceWorkspaceIdChange}
        />
        <img className={styles.arrow} src={arrowRight} alt="" />
        <WorkspaceSelect
          workspaces={props.workspaces}
          workspaceId={props.targetWorkspaceId}
          onChange={props.onTargetWorkspaceIdChange}
        />
      </div>
      <div className={styles.grid}>
        <div>
          <label htmlFor="selected-project">Target project</label>
          <select
            id="selected-project"
            value={props.selectedProjectId}
            onChange={(evt) =>
              props.onProjectIdChange(Number(evt.currentTarget.value))
            }
          >
            {props.workspaceProjects.map((project) => {
              return (
                <option key={`project-${project.id}`} value={project.id}>
                  {project.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="billables">Billables</label>
          <select
            id="billables"
            value={billable}
            onChange={(evt) => {
              const isBillable = evt.currentTarget.value as Billable;
              setBillable(isBillable);
              props.onBillableChange(isBillable);
            }}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default memo(TimeEntrySettings);
