// src/interfaces/user-attributes.ts
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
