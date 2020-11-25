import dateformat from 'dateformat';
import React, { memo, useState } from 'react';
import styles from './DatePicker.module.scss';

export function parseISODate(text: string) {
  const b = text.split(/\D/).map(Number);
  return new Date(b[0], --b[1], b[2]);
}

interface DatePickerProps {
  defaultValue?: Date;
  onChange: (date: Date) => void;
}

function DatePicker(props: DatePickerProps) {
  const [value, setValue] = useState(dateformat(props.defaultValue, 'isoDate'));

  return (
    <input
      className={styles.datePicker}
      type="date"
      value={value}
      max={dateformat(new Date(), 'isoDate')}
      onChange={(evt) => {
        const { value } = evt.currentTarget;
        setValue(value);
        props.onChange(parseISODate(value));
      }}
    />
  );
}

export default memo(DatePicker);
