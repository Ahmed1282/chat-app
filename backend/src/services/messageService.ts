// src/services/messageService.ts
import { Message } from '../models/message';
import { MessageAttributes } from '../interfaces/message-attributes';

class MessageService {
  async postMessage(sender_id: number, chat_id: number, message_str: string): Promise<Message> {
    try {
      const newMessage = await Message.create({
        sender_id,
        chat_id,
        message_str,
      });

      return newMessage;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in postMessage: ${error.message}`);
      } else {
        throw new Error('Error in postMessage: An unknown error occurred.');
      }
    }
  }

  async getMessagesByChatId(chat_id: number): Promise<Message[]> {
    try {
      const messages = await Message.findAll({ where: { chat_id } });
      return messages;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in getMessagesByChatId: ${error.message}`);
      } else {
        throw new Error('Error in getMessagesByChatId: An unknown error occurred.');
      }
    }
  }
}

export default new MessageService();
