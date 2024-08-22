import { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { Users } from '../interfaces/user-interface'

const useUserDetails = () => {
  const storedUser = localStorage.getItem('user');
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<Users>({});
  const [currentRecipientId, setCurrentRecipientId] = useState<number | null>(null);

  useEffect(() => {
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, [storedUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/v1/users/getAllUsers');
        const usersList = response.data;
        const usersObject: Users = {};
        usersList.forEach((user: { username: string; id: number }) => {
          usersObject[user.username] = user.id;
        });
        setUsers(usersObject);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (username: string, recipientId: number) => {
    console.log(username)
    if (currentRecipientId === recipientId) {
      return;
    }

    setCurrentRecipientId(recipientId);
  };
  

return {
  username,
  users,
  handleUserClick,
  currentRecipientId,
  setCurrentRecipientId,
};

};

export default useUserDetails;
