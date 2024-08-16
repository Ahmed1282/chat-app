// src/interfaces/message-attributes.ts
export interface MessageAttributes {
    id?: number;
    sender_id: number;
    chat_id:number;
    message_str: string;
    created_at?: Date;
    updated_at?: Date;
  }
  