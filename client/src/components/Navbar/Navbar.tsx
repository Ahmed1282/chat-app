import React from 'react';

// Define the type for the users prop
interface NavbarProps {
  users: { [username: string]: string };
}

const Navbar: React.FC<NavbarProps> = ({ users }) => {
  return (
    <div className="navbar">
      <h2>Users</h2>
      <ul>
        {Object.keys(users).map((username) => (
          <li key={username}>{username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
