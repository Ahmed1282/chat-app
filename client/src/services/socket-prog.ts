import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface Message {
  fromId: number;
  toId: number;
  message: string;
  created_at: string;
}

interface Users {
  [username: string]: number;
}

const useSocket = (currentUserId: number, users: Users) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [usernames, setUsernames] = useState<{ [userId: number]: string }>({});

  useEffect(() => {
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      socketInstance.emit('register', JSON.stringify({ userId: currentUserId }));
      setIsRegistered(true);
    });

    socketInstance.on('disconnect', () => {
      setIsRegistered(false);
    });

    socketInstance.on('update_users', (usersList: { username: string; id: number }[]) => {
      const usersObject: { [userId: number]: string } = {};
      usersList.forEach(user => {
        usersObject[user.id] = user.username;
      });
      setUsernames(usersObject);
    });

    socketInstance.on('receive_message', (data: Message) => {
      if (data.fromId !== currentUserId) {
        setReceivedMessages(prevMessages => [...prevMessages, data]);
      }
    });

    return () => {
      socketInstance.off('connect');
      socketInstance.off('disconnect');
      socketInstance.off('update_users');
      socketInstance.off('receive_message');
      socketInstance.disconnect();
    };
  }, [currentUserId]);

  const sendMessage = (recipientId: number, message: string) => {
    if (isRegistered && currentUserId && recipientId && message.trim() && socket) {
      const newMessage = { fromId: currentUserId, toId: recipientId, message };
      socket.emit('send_message', JSON.stringify(newMessage));
      setReceivedMessages(prevMessages => [...prevMessages, { ...newMessage, created_at: new Date().toISOString() }]);
    }
  };

  return {
    receivedMessages,
    sendMessage,
    isRegistered,
    usernames
  };
};

export default useSocket;
