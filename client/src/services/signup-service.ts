// src/services/signup-service.ts

import axios from 'axios';

// Function to handle signup
export const handleSignup = async (
  name: string,
  username: string,
  password: string,
  number: string,
  email: string
): Promise<void> => {
  try {
    await axios.post('http://localhost:3000/api/users/signup', {
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
