import React, { useState, useEffect, KeyboardEvent } from 'react';
import Navbar from '../Navbar/Navbar';
import useUserDetails from '../../services/user';
import useSocket from '../../services/socket';
import { fetchMessagesBySenderAndReceiver } from '../../services/message';
import { Message } from '../../interfaces/socket-interface';
import './Home.scss';

const Home: React.FC = () => {
  const { username, users, handleUserClick, currentRecipientId } = useUserDetails();
  const userId = users[username];
  const { sendMessage, isRegistered, userStatus, socket } = useSocket(userId);

  const [message, setMessage] = useState<string>('');
  const [currentChatMessages, setCurrentChatMessages] = useState<Message[]>([]);

  const transformMessage = (msg: { sender_id: number; receiver_id: number; message_str: string; created_at: string }): Message => ({
    fromId: msg.sender_id,
    toId: msg.receiver_id,
    message: msg.message_str,
    created_at: new Date(msg.created_at),
  });

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentRecipientId !== null) {
        try {
          const messagesFromUser = await fetchMessagesBySenderAndReceiver(userId, currentRecipientId);
          const transformedMessagesFromUser = messagesFromUser.map(transformMessage);

          const messagesFromRecipient = await fetchMessagesBySenderAndReceiver(currentRecipientId, userId);
          const transformedMessagesFromRecipient = messagesFromRecipient.map(transformMessage);

          const allMessages = [
            ...transformedMessagesFromUser,
            ...transformedMessagesFromRecipient,
          ].sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

          setCurrentChatMessages(allMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [currentRecipientId, userId]);

  const handleSendMessage = () => {
    if (currentRecipientId !== null && message.trim()) {
      if (isRegistered && socket) {
        const newMessage: Message = {
          fromId: userId,
          toId: currentRecipientId,
          message,
          created_at: new Date(),
        };
        setCurrentChatMessages(prevMessages => [...prevMessages, newMessage]);
        sendMessage(currentRecipientId, message);
        setMessage('');
      } else {
        console.warn('Socket not connected or user not registered.');
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleNewMessage = (message: { fromId: number; toId: number; message: string; created_at: string }) => {
      const messageWithDate: Message = {
        fromId: message.fromId,
        toId: message.toId,
        message: message.message,
        created_at: new Date(message.created_at),
      };

      if (
        (messageWithDate.fromId === userId && messageWithDate.toId === currentRecipientId) ||
        (messageWithDate.fromId === currentRecipientId && messageWithDate.toId === userId)
      ) {
        setCurrentChatMessages((prevMessages) => {
          const allMessages = [...prevMessages, messageWithDate];
          const uniqueMessages = allMessages.filter(
            (msg, index, self) =>
              index === self.findIndex(
                (t) =>
                  t.created_at.getTime() === msg.created_at.getTime() &&
                  t.message === msg.message
              )
          );
          return uniqueMessages.sort((firstMsg, secondMsg) => firstMsg.created_at.getTime() - secondMsg.created_at.getTime());
        });
      }
    };

    if (socket) {
      socket.on('receive_message', handleNewMessage);
      return () => {
        socket.off('receive_message', handleNewMessage);
      };
    }
  }, [socket, userId, currentRecipientId]);

  const filteredMessages = currentChatMessages.filter(
    (msg) =>
      (msg.fromId === userId && msg.toId === currentRecipientId) ||
      (msg.fromId === currentRecipientId && msg.toId === userId)
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const recipientUsername = currentRecipientId
    ? Object.keys(users).find((user) => users[user] === currentRecipientId)
    : '';

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    window.location.href = import.meta.env.VITE_LOGIN_URL;
  };

  return (
    <div className="home">
      <div className="sidebar">
        <Navbar
          users={users}
          onUserClick={handleUserClick}
          currentUsername={username}
          userStatus={userStatus}
          currentRecipientUsername={recipientUsername || ''}
        />
      </div>
      <div className="chatbox">
        <div className="chat-title">
          <h2>{recipientUsername ? `${recipientUsername}` : 'Select a user to start chatting'}</h2>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="message-container">
          <div className="message-list">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <div key={index} className="message">
                  <strong>
                    {Object.keys(users).find((user) => users[user] === msg.fromId) || 'Unknown'}
                    <span className="timestamp"> - {formatTime(msg.created_at)}</span>
                  </strong>
                  <div>{msg.message}</div>
                </div>
              ))
            ) : (
              <div>No messages</div>
            )}
          </div>
          <div className="input-container">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage} disabled={!isRegistered}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
