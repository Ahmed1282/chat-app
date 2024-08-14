import { Request, Response } from 'express';
import UserService from '../services/userService';

const Signup = async (req: Request, res: Response) => {
  const { name, username, password, number, email, display, info } = req.body;

  try {
    if (!name || !username || !password || !number || !email) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const newUser = await UserService.signup(name, username, password, number, email, display, info);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

export default Signup;
