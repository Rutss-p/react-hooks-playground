
import React from 'react';

const UserList = React.memo(({ onHandle, user }) => {
  console.log('Rendering child:', user.firstName);

  return (
    <div className="user">
      <div className="user-info">
        <h4>{user.firstName} {user.lastName}</h4>
        <p>{user.email}</p>
      </div>

      <button onClick={() => onHandle('remove', user)}>
        Delete
      </button>
    </div>
  );
});

export default UserList;
