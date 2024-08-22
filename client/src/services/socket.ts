import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { Message, UserStatus } from '../interfaces/socket-interface';

const useSocket = (currentUserId: number) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [usernames] = useState<{ [userId: number]: string }>({});
  const [userStatus, setUserStatus] = useState<UserStatus>({});

  useEffect(() => {
    const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL;

    const socketInstance = io(socketServerUrl, {
      query: { userId: currentUserId }
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsRegistered(true);
      setUserStatus(prevStatus => ({ ...prevStatus, [currentUserId]: true }));
    });

    socketInstance.on('receive_message', (data) => {
      console.log("Data from backend: ", data);
      setReceivedMessages(prevMessages => [...prevMessages, data]);
    });

    socketInstance.on('active_users', (activeUsers: { userId: number; status: 'active' | 'inactive' }[]) => {
      const statusMap: UserStatus = {};
      activeUsers.forEach(({ userId, status }) => {
        statusMap[userId] = status === 'active';
      });
      setUserStatus(statusMap);
    });

    socketInstance.on('user_status_update', ({ userId, status }: { userId: number, status: 'active' | 'inactive' }) => {
      setUserStatus(prevStatus => ({ ...prevStatus, [userId]: status === 'active' }));
    });

    socketInstance.on('disconnect', () => {
      setIsRegistered(false);
      setUserStatus(prevStatus => ({ ...prevStatus, [currentUserId]: false }));
    });

    return () => {
      socketInstance.off('connect');
      socketInstance.off('disconnect');
      socketInstance.off('receive_message');
      socketInstance.off('active_users');
      socketInstance.off('user_status_update');
      socketInstance.disconnect();
    };
  }, [currentUserId]);

  const sendMessage = (recipientId: number, message: string) => {
    if (isRegistered && currentUserId && recipientId && message.trim() && socket) {
      const newMessage = { fromId: currentUserId, toId: recipientId, message, created_at: new Date().toISOString() };
      console.log("Front end message sending function is,", newMessage);
      socket.emit('send_message', newMessage);
    } else {
      console.warn('Message not sent. Check socket connection and message details.');
    }
  };

  return {
    socket,
    receivedMessages,
    sendMessage,
    isRegistered,
    usernames,
    userStatus,
  };
};

export default useSocket;
