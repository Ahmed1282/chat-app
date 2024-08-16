import { Chat } from '../models/chat';
import { ChatAttributes } from '../interfaces/chat-attributes';

class ChatService {
  async createChat(sender_id: number): Promise<Chat> {
    try {
      const newChat = await Chat.create({
        sender_id,
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
}

export default new ChatService();
