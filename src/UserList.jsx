
import React, { useContext } from 'react';
import AuthContext from './context/AuthContext';

const UserList = React.memo(({ onHandle, user }) => {
    const {user:loginuser} = useContext(AuthContext);

  return (
    <div className="user">
      <div className="user-info">
        <h4>{user.firstName} {user.lastName}</h4>
        <p>{user.email}</p>
      </div>

      {loginuser.role === "User"?(<button onClick={() => onHandle('remove', user)}>
        Delete
      </button>):(<button>View</button>)}
    </div>
  );
});

export default UserList;
