// src/services/userService.ts
import { User } from '../models/user'; // Adjust the path as necessary

import bcrypt from 'bcrypt';

// Define salt rounds
const saltRounds = 10;

class UserService {
  async signup(
    name: string,
    username: string,
    password: string,
    number: string,
    email: string,
    display: string,
    info?: string
  ): Promise<User> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      const newUser = await User.create({
        name,
        username,
        password: hashedPassword,
        number,
        email,
        display,
        info,
      });

      return newUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in signup: ${error.message}`);
      } else {
        throw new Error('Error in signup: An unknown error occurred.');
      }
    }
  }
}

export default new UserService();
