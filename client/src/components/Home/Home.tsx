import React from 'react';
import Navbar from '../Navbar/Navbar';
import useUserDetails from '../../services/user-details';
import useSocket from '../../services/socket-prog';
import { postMessage } from '../../services/message-service';
import { createChat } from '../../services/chat-service';
import './Home.scss';

const Home: React.FC = () => {
  const { username, users, handleUserClick, currentRecipientId, setCurrentRecipientId } = useUserDetails();
  const userId = users[username];
  const { receivedMessages, sendMessage, isRegistered } = useSocket(userId, users);

  const [message, setMessage] = React.useState<string>('');
  const [currentChatId, setCurrentChatId] = React.useState<number | null>(null);

  const handleUserClickAndRegister = async (username: string) => {
    const recipientId = users[username];
    try {
      const newChat = await createChat(recipientId);
      setCurrentChatId(newChat.id);
      setCurrentRecipientId(recipientId);
      handleUserClick(username, recipientId);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleSendMessage = async () => {
    if (currentRecipientId !== null && message.trim() && currentChatId !== null) {
      sendMessage(currentRecipientId, message);

      try {
        await postMessage(message, userId, currentChatId); 
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage('');
    }
  };

  const filteredMessages = receivedMessages.filter(
    msg => (msg.fromId === currentRecipientId || msg.toId === currentRecipientId)
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="home">
      <div className="sidebar">
        <Navbar
          users={users}
          onUserClick={handleUserClickAndRegister}
          currentUsername={username}
        />
      </div>
      <div className="chatbox">
        <div className="message-container">
          <div className="message-list">
            {filteredMessages.map((msg, index) => (
              <div key={index} className="message">
                <strong>
                  {Object.keys(users).find(user => users[user] === msg.fromId) || 'Unknown'}  
                  <span className="timestamp"> - {formatTime(new Date(msg.created_at))}</span>
                </strong>
                {msg.message}
              </div>
            ))}
          </div>
          <div className="input-container">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button onClick={handleSendMessage} disabled={!isRegistered}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
