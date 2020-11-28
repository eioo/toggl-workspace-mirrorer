import React, { useMemo, useState } from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = (
  | {
      checkedText?: string;
      uncheckedText?: string;
    }
  | {
      text: string;
    }
) & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const [checked, setChecked] = useState(!!props.checked);

  const text = useMemo(
    () =>
      'text' in props
        ? props.text
        : checked
        ? props.checkedText
        : props.uncheckedText,
    [checked, props]
  );

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.currentTarget.checked;
    setChecked(isChecked);
    props.onChange && props.onChange(isChecked);
  };

  return (
    <label htmlFor="check" className={styles.root}>
      <input
        id="check"
        type="checkbox"
        name="checkbox"
        value="value"
        onChange={onChange}
      />
      {text}
      {props.children}
    </label>
  );
};

export default Checkbox;
