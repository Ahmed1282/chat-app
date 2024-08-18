import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

interface Users {
  [username: string]: number; // Maps username to user ID (number)
}

const useUserDetails = () => {
  const storedUser = localStorage.getItem('user');
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<Users>({});
  const [currentRecipientId, setCurrentRecipientId] = useState<number | null>(null);

  // Retrieve username from local storage
  useEffect(() => {
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, [storedUser]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users/names');
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
    if (currentRecipientId === recipientId) {
      return; // Avoid setting the same recipient again
    }
    console.log(`User clicked: ${username}, ID: ${recipientId}`);
    setCurrentRecipientId(recipientId);
  };
  

  // Add setCurrentRecipientId to the return object
return {
  username,
  users,
  handleUserClick,
  currentRecipientId,
  setCurrentRecipientId,
};

};

export default useUserDetails;
