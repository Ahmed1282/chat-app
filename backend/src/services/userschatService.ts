import { UsersChat } from '../models/users_chat';
import { UsersChatAttributes } from '../interfaces/users_chat-attributes';

class UsersChatService {
  async createUsersChat(sender_id: number, chat_id: number): Promise<UsersChat> {
    try {
      const newUsersChat = await UsersChat.create({
        sender_id,
        chat_id,
      });
      return newUsersChat;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in createUsersChat: ${error.message}`);
      } else {
        throw new Error('Error in createUsersChat: An unknown error occurred.');
      }
    }
  }

  async getAllUsersChats(): Promise<UsersChat[]> {
    try {
      const usersChats = await UsersChat.findAll();
      return usersChats;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in getAllUsersChats: ${error.message}`);
      } else {
        throw new Error('Error in getAllUsersChats: An unknown error occurred.');
      }
    }
  }

  async getUsersChatById(id: number): Promise<UsersChat | null> {
    try {
      const usersChat = await UsersChat.findByPk(id);
      return usersChat;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in getUsersChatById: ${error.message}`);
      } else {
        throw new Error('Error in getUsersChatById: An unknown error occurred.');
      }
    }
  }
}

export default new UsersChatService();
