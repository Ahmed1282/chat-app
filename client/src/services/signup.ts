import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

export const handleSignup = async (
  name: string,
  username: string,
  password: string,
  number: string,
  email: string
): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/v1/users/signup`, {
      name,
      username,
      password,
      number,
      email,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error during signup: ${error.message}`);
    } else {
      throw new Error('Error during signup: An unknown error occurred.');
    }
  }
};

export const redirectToLogin = () => {
  window.location.href = LOGIN_URL;
};
