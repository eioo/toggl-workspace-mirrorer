import React, { memo } from 'react';
import { TimeEntry } from '../../types/toggl';
import DailyTimeEntry from '../DailyTimeEntry';

interface TimeEntryListProps {
  mirroredDays: Set<string>;
  dailyEntries: TimeEntry[][];
  pageCount?: number;
  currentPage?: number;
}

function TimeEntryList(props: TimeEntryListProps) {
  if (props.pageCount === 0) {
    return <div>No time entries</div>;
  }

  return (
    <div>
      {props.currentPage &&
        props.currentPage !== props.pageCount &&
        `${props.currentPage}/${props.pageCount}`}

      {props.dailyEntries.map((entries, index) => (
        <DailyTimeEntry
          key={`daily-entry-${index}`}
          entries={entries}
          mirroredDays={props.mirroredDays}
        />
      ))}
    </div>
  );
}

export default memo(TimeEntryList);
