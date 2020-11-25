import React, { memo } from 'react';

interface ApiTokenInputProps {
  localStorageKey: string;
  value: string;
  placeholder?: string;
  onChange: (apiToken: string) => void;
}
/**
 * Saves value to local storage on blur
 */
function LocalStorageInput(props: ApiTokenInputProps) {
  return (
    <input
      type="text"
      onChange={(e) => props.onChange(e.currentTarget.value)}
      onBlur={(e) =>
        localStorage.setItem(props.localStorageKey, e.currentTarget.value)
      }
      value={props.value}
      placeholder={props.placeholder}
    />
  );
}

export default memo(LocalStorageInput);
