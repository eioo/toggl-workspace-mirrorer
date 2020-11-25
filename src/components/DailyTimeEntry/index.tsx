import classnames from 'classnames';
import dateformat from 'dateformat';
import sumBy from 'lodash-es/sumBy';
import truncate from 'lodash-es/truncate';
import React, { memo, useMemo, useState } from 'react';
import { formatDuration, getDayOfWeek } from '../../services/date';
import { TimeEntry } from '../../types/toggl';
import styles from './DailyTimeEntry.module.scss';

interface DailyTimeEntryProps {
  entries: TimeEntry[];
}

function DailyTimeEntry(props: DailyTimeEntryProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const totalDuration = useMemo(() => sumBy(props.entries, (e) => e.dur), [
    props.entries,
  ]);
  const dayDate = new Date(props.entries[0].start);

  return (
    <div
      className={classnames(styles.root, {
        [styles.isCollapsed]: isCollapsed,
      })}
    >
      <header onClick={() => setIsCollapsed((old) => !old)}>
        <div>{getDayOfWeek(dayDate)}</div>
        <div>{dateformat(dayDate, 'dd.mm.')}</div>
        <div>{formatDuration(totalDuration)}</div>
      </header>

      {!isCollapsed && (
        <div className={styles.content}>
          {props.entries.map((entry) => {
            const startTime = new Date(entry.start);
            const endTime = new Date(entry.end);

            return (
              <div className={styles.timeEntry} key={`time-entry-${entry.id}`}>
                <div>
                  {dateformat(startTime, 'HH:MM')} -{' '}
                  {dateformat(endTime, 'HH:MM')}
                </div>
                <div title={entry.description}>
                  {truncate(entry.description, {
                    length: 40,
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(DailyTimeEntry);
