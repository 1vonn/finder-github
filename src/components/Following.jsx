import  { useState, useEffect } from 'react';
import './following.css';

function Following({ username }) {
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/following`);
        if (!response.ok) {
          throw new Error('There was an error fetching following, please check the username or internet connection and try again');
        }
        const data = await response.json();
        setFollowing(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setFollowing([]);
      }
    };

    if (username) {
      fetchFollowing();
    }
  }, [username]);

  if (!following.length) {
    return null;
  }

  return (
    <div className="following">
      <h2>Following:</h2>
      <ul className="following-list">
        {following.map((user) => (
          <li key={user.id} className="following-item">
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              <img src={user.avatar_url} alt={user.login} className="following-avatar" />
              <span className="following-name">{user.login}</span> <br />
              <strong className="following-view-link">View {user.login}</strong>
            </a>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Following;
