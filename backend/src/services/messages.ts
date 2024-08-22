// src/services/messageService.ts
import { Message } from '../models/message';

class MessageService {
  async postMessage(sender_id: number, receiver_id: number, message_str: string): Promise<Message> {
    try {
      const newMessage = await Message.create({
        sender_id,
        receiver_id,
        message_str,
      });

      return newMessage;
    } catch (error) {
      throw new Error(`Error in postMessage: ${error}`);
    }
  }

  async getMessagesBySenderAndReceiver(sender_id: number, receiver_id: number): Promise<Message[]> {
    try {
      const messages = await Message.findAll({
        where: {
          sender_id,
          receiver_id,
        },
        order: [['created_at', 'ASC']], 
      });
      return messages;
    } catch (error) {
      throw new Error(`Error in getMessagesBySenderAndReceiver: ${error}`);
    }
  }
}

export default new MessageService();
