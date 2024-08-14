import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import { Socket } from 'socket.io-client';

// Define the type for the received message
interface Message {
  from: string;
  message: string;
}

// Define the type for the users object
interface Users {
  [username: string]: string; // Maps username to socket ID
}

const Home: React.FC = () => {
  const [username] = useState<string>(uuidv4());
  const [message, setMessage] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Users>({});
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io('http://localhost:3000'); 

    setSocket(socket)
    // Register the user with the server
    socket.emit('register', username);

    // Update users list on receiving data from server
    socket.on('update_users', (usersList: string[]) => {
      const usersObject: Users = {};
      usersList.forEach(user => {
        usersObject[user] = ''; // Add username with an empty socket ID
      });
      setUsers(usersObject);
    });

    // Listen for incoming messages
    socket.on('receive_message', (data: Message) => {
      setReceivedMessages(prevMessages => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('update_users');
      socket.off('receive_message');
    };
  }, [username]);

  const handleSendMessage = () => {
    if (username.trim() && recipient.trim() && message.trim() && socket) {
      // Emit the message to the server
      socket.emit('send_message', JSON.stringify({ from: username, to: recipient, message }));
      setMessage('');
    }
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <Navbar users={users} />
      </div>
      <div className="main-content">
        <h1>Socket.IO Messaging</h1>

        <div>
          <h2>Send Message</h2>
          <input
            type="text"
            placeholder="Recipient username"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>

        <div>
          <h2>Received Messages</h2>
          <ul>
            {receivedMessages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.from}:</strong> {msg.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
