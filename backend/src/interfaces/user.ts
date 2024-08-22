import { Request } from 'express';

export interface UserAttributes {
  id?: number;
  name: string;
  username: string;
  number: string;
  email: string;
  display?: string;
  info?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserLoginResponse {
  token: string;
  user: {
    name: string;
    username: string;
    email: string;
    info?: string;
  };
}



export interface CustomRequest extends Request {
  userEmail?: string; // Attach only the email, not the entire user object
}

export interface JwtPayload {
  email: string;
}


export type SignupParams = {
  name: string;
  username: string;
  password: string;
  number: string;
  email: string;
  display: string;
  info?: string;
}

