import React, { memo } from 'react';
import { TimeEntry } from '../../types/toggl';
import DailyTimeEntry from '../DailyTimeEntry';

interface TimeEntryTableProps {
  dailyEntries: TimeEntry[][];
}
function TimeEntryTable(props: TimeEntryTableProps) {
  return (
    <div>
      {props.dailyEntries.map((entries) => (
        <DailyTimeEntry entries={entries} />
      ))}
    </div>
  );
}

export default memo(TimeEntryTable);
