import React from 'react';
import './Navbar.scss';
import { NavbarProps } from '../../interfaces/navarbar-type';


const Navbar: React.FC<NavbarProps> = ({
  users,
  onUserClick,
  currentUsername,
  userStatus,
  currentRecipientUsername, 
}) => {
  const sortedUsernames = Object.keys(users).sort((userNotFirst, userFirst) => {
    if (userNotFirst === currentUsername) return -1;
    if (userFirst === currentUsername) return 1;
    return 0;
  });

  return (
    <div className="navbar">
      <div className="navbar-title">
        <div className="title-text">QLU Recruiting</div>
        <div className="title-line"></div>
      </div>
      <div>
        {sortedUsernames.map((username) => (
          <div
            key={username}
            onClick={() => onUserClick(username, users[username])}
            className={`user-item ${
              currentRecipientUsername === username ? 'selected' : ''
            }`}
          >
            <span
              className={`status-dot ${
                userStatus[users[username]] ? 'active' : 'inactive'
              }`}
            ></span>
            {username === currentUsername ? 'Me' : username}
          </div>
        ))}
      </div>
      <div className="current-username">
        <strong>{currentUsername}</strong>
      </div>
    </div>
  );
};

export default Navbar;
