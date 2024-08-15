// src/middleware/auth.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { CustomRequest } from '../interfaces/user-jwt'

interface JwtPayload {
  email: string;
}

export const AuthToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    let tokenString = token;

    if (!token.startsWith('Bearer ')) {
      tokenString = `Bearer ${token}`;
    }

    const decoded = jwt.verify(tokenString.split(' ')[1], process.env.SECRET!) as JwtPayload;

    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    req.user = user; 
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      console.error('JWT Verification Error: An unknown error occurred.');
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  
};
