import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axiosInstance from '../../services/axiosInstance';
import './Home.scss';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

interface Message {
  from: string;
  message: string;
}

interface Users {
  [username: string]: number; // Maps username to socket ID (number type)
}

const Home: React.FC = () => {
  // Retrieve user details from local storage
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('userDetails');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username); // Assuming user object has a username property
    }
  }, [storedUser]);

  const [message, setMessage] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Users>({});
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users/names');
        const usersList = response.data;
        const usersObject: Users = {};
        usersList.forEach((user: { username: string; id: number }) => {
          usersObject[user.username] = user.id; // Add username with its corresponding socket ID (as a number)
        });
        setUsers(usersObject);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [username]);

  const handleUserClick = (username: string, userId: number) => {
    console.log(`User clicked: ${username}, ID: ${userId}`);
    setRecipient(username); // Set the recipient to the clicked user
  };

  return (
    <div className="home-container">
        <div className="sidebar">
          <Navbar users={users} onUserClick={handleUserClick} currentUsername={username} />
        </div>
        <div className="main-content">
          <h1>Welcome, {username}</h1>
          {/* Add the rest of your main content here */}
        </div>
      </div>
  );
};

export default Home;
