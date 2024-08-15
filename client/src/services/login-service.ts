// src/services/login-service.ts
import axiosInstance from './axiosInstance';

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/users/login', {
      email,
      password,
    });

    console.log('Login successful:', response.data);

    const { userdata } = response.data;
    const authToken = userdata.token;
    const user = userdata.user;

    if (typeof authToken === 'string' && user && typeof user === 'object') {
      localStorage.setItem('userDetails', authToken);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.error('Unexpected response format:', response.data);
    }

    window.location.href = 'http://localhost:5173/dashboard';
  } catch (error) {
    console.error('Error during login:', error);
    alert('Error, kindly check your inputs');
  }
};
