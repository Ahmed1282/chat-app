// src/types/custom.d.ts
import { User } from '../models/user';
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: User;
}
