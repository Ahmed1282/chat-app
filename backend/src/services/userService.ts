// src/services/userService.ts
import { User } from '../models/user';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserLoginResponse } from '../interfaces/user-login';
import { UserAttributes } from  '../interfaces/user-attributes';


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
      const hashedPassword = await bcrypt.hash(password, saltRounds);

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

  async login(email: string, password: string): Promise<UserLoginResponse> {
    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        throw new Error('User not found');
      }
  
      const userData = user.get({ plain: true });
  
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }
  
      const token = jwt.sign({ email: userData.email }, process.env.SECRET!, { expiresIn: '1h' });
      
      return {
        token,
        user: {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          info: userData.info,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in login: ${error.message}`);
      } else {
        throw new Error('Error in login: An unknown error occurred.');
      }
    }
  }

  async getAllUsers(): Promise<UserAttributes[]> {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },// Exclude the password field
        //raw: true,  // This will return plain objects instead of Sequelize instances
      });

      // console.log(`users: ${JSON.stringify(users, null, 2)}`);

      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in getAllUsers: ${error.message}`);
      } else {
        throw new Error('Error in getAllUsers: An unknown error occurred.');
      }
    }
  }
}

export default new UserService();
