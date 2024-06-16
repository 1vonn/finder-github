import  { useState, useEffect } from 'react';
import './repos.css';
import { IoIosStar } from "react-icons/io";

function Repos({ username }) {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=30`);
        if (!response.ok) {
          throw new Error('There was an error fetching  repositories please check username or internet connection and try again');
        }
        const data = await response.json();
        setRepos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setRepos([]);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username]);

  if (!repos.length) {
    return null;
  }

  return (
    <div className="repos">
      <h2>Repositories:</h2>
      <ul className="repos-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
              {repo.name}
            </a>
            <p><a href=''><IoIosStar /></a>Stars: {repo.stargazers_count}</p>
            <p>Forks: {repo.forks_count}</p>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Repos;
