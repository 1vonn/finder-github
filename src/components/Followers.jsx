import  { useState, useEffect } from 'react';
import './followers.css';

function Followers({ username }) {
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/followers`);
        if (!response.ok) {
          throw new Error('There was an error fetching followers, please check the username or internet connection and try again');
        }
        const data = await response.json();
        setFollowers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setFollowers([]);
      }
    };

    if (username) {
      fetchFollowers();
    }
  }, [username]);

  if (!followers.length) {
    return null;
  }

  return (
    <div className="followers">
      <h2>Followers:</h2>
      <ul className="followers-list">
        {followers.map((follower) => (
          <li key={follower.id} className="follower-item">
            <img src={follower.avatar_url} alt={follower.login} className="follower-avatar" />
            <span className="follower-name">{follower.login}</span>
            <a href={follower.html_url} target="_blank" rel="noopener noreferrer">View {follower.login}</a>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Followers;
