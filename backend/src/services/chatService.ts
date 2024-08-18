import { Chat } from '../models/chat';
import { ChatAttributes } from '../interfaces/chat-attributes';

class ChatService {
  async createChat(receiver_id: number): Promise<Chat> {
    try {
      const newChat = await Chat.create({
        receiver_id,
      });

      return newChat;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in createChat: ${error.message}`);
      } else {
        throw new Error('Error in createChat: An unknown error occurred.');
      }
    }
  }

  async getAllChats(): Promise<Chat[]> {
    try {
      return await Chat.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in getAllChats: ${error.message}`);
      } else {
        throw new Error('Error in getAllChats: An unknown error occurred.');
      }
    }
  }

  async getChatById(id: number): Promise<Chat | null> {
    try {
      return await Chat.findByPk(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in getChatById: ${error.message}`);
      } else {
        throw new Error('Error in getChatById: An unknown error occurred.');
      }
    }
  }
}

export default new ChatService();
