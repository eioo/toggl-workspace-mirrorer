import React from 'react';
import { User } from '../../types/toggl';

interface UserDetailsProps {
  user: User | undefined;
}

function UserDetails(props: UserDetailsProps) {
  if (!props.user) {
    return null;
  }

  return (
    <div>
      User: {props.user.fullname} ({props.user.email})
    </div>
  );
}

export default UserDetails;
