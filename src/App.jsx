
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);


  const HandleUser = useCallback((action, user) => {
    if (action === "add") {
      setUsers((prev) => [...prev, user]);
    }
    else (action === "remove")
        console.log("rendering the handleuser removing user")
    {
      setUsers((prev) => prev.filter((item) => item.id !== user.id))
    }
  }, [])

  return (
    <>
    <div className="container">
      <h2>User List</h2>

      {users.map((user) => (
        <div className="user" key={user.id}>
          <img src={user.image} alt={user.firstName} />

          <div>
            <h4>{user.firstName} {user.lastName}</h4>
            <p>{user.email}</p>
          </div>
        </div>
      ))}
    </div>
    <div>
      {
        users.map((user)=>(
        <UserList
        key={user.id}
        user={user}
        onHandle={HandleUser} 
      />
      ))}

    </div>
    </>
  );
}

export default App;
