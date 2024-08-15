import React from 'react';
import './Navbar.scss';

type NavbarProps = {
  users: { [username: string]: number };
  onUserClick: (username: string, userId: number) => void;
  currentUsername: string;
};

const Navbar: React.FC<NavbarProps> = ({ users, onUserClick, currentUsername }) => {
  const sortedUsernames = Object.keys(users).sort((a, b) => {
    if (a === currentUsername) return -1;
    if (b === currentUsername) return 1;
    return 0;
  });

  return (
    <div className="navbar">
      <div className="navbar-title">
        <div className="title-text">QLU Recruiting</div>
        <div className="title-line"></div>
      </div>
      <ul>
        {sortedUsernames.map((username) => (
          <li key={username} onClick={() => onUserClick(username, users[username])}>
            <div className="user-item">
              {username === currentUsername ? 'Me' : username}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
