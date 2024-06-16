import  { useState } from 'react';
import Search from "./components/Search";
import UserProfile from './components/UserProfile';
import Repos from "./components/Repos";
import Followers from './components/Followers';
import Following from './components/Following';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <Search setUsername={setUsername} />
      {username && (
        <> 
        <div className='app-items'>
          <div className='app-pprofile'>
          <UserProfile username={username} />
          </div>
          <div className='app-username'>
        <Repos username={username} />
        <Followers username={username}/>
        <Following username={username}/>
        </div>
        </div>
      
        </>
      )}
    </div>
  );
}

export default App;
