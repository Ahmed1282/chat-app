import axios from 'axios';

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
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

    window.location.href = 'http://localhost:5173'
  } catch (error) {
    console.error('Error during login:', error);
    alert("Error, kindly check your inputs");
  }
};
