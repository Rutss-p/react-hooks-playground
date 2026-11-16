
import {
  useCallback,
  useEffect,
  useState,
  lazy,
  Suspense
} from 'react';

import './App.css';

const UserList = lazy(() => import('./UserList'));

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  //Debouncing state
  const [searchItem, setSearchItem] = useState('');
  const [debouncingSearch, setDebouncingSearh] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();

        setUsers(data.users);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncingSearh(searchItem);
      console.log('Searching:', searchItem);
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [searchItem])

  const filterItem = users.filter((user) => {
    const search = debouncingSearch.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(search)
    )
  })

  const HandleUser = useCallback((action, user) => {
    if (action === 'add') {
      setUsers((prev) => [...prev, user]);
    } else if (action === 'remove') {
      console.log('Removing user:', user.firstName);

      setUsers((prev) =>
        prev.filter((item) => item.id !== user.id)
      );
    }
  }, []);

  return (
    <div className="container">
      <h2>User Management</h2>
      <div className="search-input-box">
        <input
          type="text"
          placeholder='Searching...'
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <div>
          <p>Result:- {filterItem.length}</p>

        </div>
      </div>

      {loading ? (
        <p className="loading">Loading users from API...</p>
      ) : (
        <Suspense fallback={<p className="loading">Loading UserList component...</p>}>
          <div className="user-grid">
            {users.map((user) => (
              <UserList
                key={user.id}
                user={user}
                onHandle={HandleUser}
              />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
}

export default App;
