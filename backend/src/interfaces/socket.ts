import { Socket as DefaultSocket } from 'socket.io';

interface CustomSocketEvents {
    register: (data: { userId: number }) => void;
    send_message: (data: { fromId: number; toId: number; message: string }) => void;
    receive_message: (data: { fromId: number; toId: number; message: string; created_at: string }) => void;
    user_status_update: (data: { userId: number; status: 'active' | 'inactive' }) => void;
    active_users: (data: { userId: number; status: 'active' | 'inactive' }[]) => void;
  }
  
export type CustomSocket = DefaultSocket<CustomSocketEvents>;

export interface UserStatus {
  socketId: string;
  status: 'active' | 'inactive';
}

export interface UserStatusMapType {
  [userId: number]: UserStatus;
}

export interface Socket{
  socketId: string,
} 

export interface UserConnections {
  userId: number,
  socket: Socket
}
