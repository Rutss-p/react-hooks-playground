
import {
  useCallback,
  useEffect,
  useState,
  lazy,
  Suspense,
  useContext
} from 'react';

import './App.css';
import AuthContext from './context/AuthContext';
import ThemeContext from './context/ThemeContext';

const UserList = lazy(() => import('./UserList'));

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("theme data", theme)

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

  //theme implementation
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? 'dark' : 'light')
  }

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
    <div className="container" data-theme={theme}>
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
        <button onClick={() => setUser({ name: 'Satyajeet', role: 'User' })}>
          Login user
        </button>
        <h2>{user.name}</h2>
        <h2>{user.role}</h2>
      </div>
      <h3>Theme {theme}</h3>
      <button onClick={toggleTheme}>Switch the theme</button>
      <label className='switching'>
        <input
        type='checkbox'
        checked={theme==="light"}
        onChange={toggleTheme}
        />
        <span className='slider'></span>
      </label>

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
