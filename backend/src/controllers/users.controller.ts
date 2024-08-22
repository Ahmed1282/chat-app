import { Request, Response } from 'express';
import UserService from '../services/users';

const Signup = async (req: Request, res: Response) => {
  const { name, username, password, number, email, display, info } = req.body;

  try {
    if (!name || !username || !password || !number || !email) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const newUser = await UserService.signup(name, username, password, number, email, display, info);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
  }
  
};

const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userdata = await UserService.login(email, password);
    res.status(201).json({ userdata });
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
  }
  
};


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
  }
};



export {Signup, Login, getAllUsers};
