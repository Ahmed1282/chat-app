import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest, JwtPayload } from '../interfaces/user';

export const AuthToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET!) as JwtPayload;

    req.userEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token or unauthorized access.' });
  }
};
