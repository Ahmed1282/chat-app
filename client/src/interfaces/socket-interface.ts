export interface Message {
    fromId: number;
    toId: number;
    message: string;
    created_at: Date;
  }
  
export interface UserStatus {
    [userId: number]: boolean;
  }
  