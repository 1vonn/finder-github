import  { useState, useEffect } from 'react';
import './userprofile.css';
import { BsBoxArrowUpRight } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { MdOutlineGroups2 } from "react-icons/md";
import { PiAddressBookFill } from "react-icons/pi";

function UserProfile({ username }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('There was an error in fetching user profile, please check the username or try again later');
        }
        const data = await response.json();
        setUserData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUserData(null);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (!userData) {
    return null; 
  }

  return (
    <div className="user-profile">
      <img src={userData.avatar_url} alt={userData.login} />
      <h3>{userData.name}</h3>
      <h2>{userData.login}</h2>
      <p>{userData.bio}</p>
      <p><a href=''><PiAddressBookFill /></a>{userData.repoCount} Public Repositories</p>
      <p><a href=''><MdGroups /></a> {userData.followers} Followers</p>
      <p><a href=''><MdOutlineGroups2 /></a> {userData.following} Following</p>
      <a href={userData.html_url} target="_blank" rel="noopener noreferrer"><a href=''><BsBoxArrowUpRight />
      </a>View Profile on GitHub</a>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default UserProfile;
