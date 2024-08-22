import axiosInstance from './axios';

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/v1/users/login', {
      email,
      password,
    });

    const { userdata } = response.data;
    const authToken = userdata.token;
    const user = userdata.user;

    if (typeof authToken === 'string' && user && typeof user === 'object') {
      localStorage.setItem('userDetails', authToken);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.error('Unexpected response format:', response.data);
    }

    window.location.href = import.meta.env.VITE_DASHBOARD_URL as string;
  } catch (error) {
    console.error('Error during login:', error);
    alert('Error, kindly check your inputs');
  }
};
