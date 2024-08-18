import { Request, Response } from 'express';
import UsersChatService from '../services/userschatService';

const createUsersChat = async (req: Request, res: Response) => {
  const { sender_id, chat_id } = req.body;

  try {
    if (!sender_id || !chat_id) {
      return res.status(400).json({ message: 'sender_id and chat_id are required.' });
    }

    const newUsersChat = await UsersChatService.createUsersChat(sender_id, chat_id);
    res.status(201).json(newUsersChat);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

const getAllUsersChats = async (req: Request, res: Response) => {
  try {
    const usersChats = await UsersChatService.getAllUsersChats();
    res.status(200).json(usersChats);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

const getUsersChatById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    const usersChat = await UsersChatService.getUsersChatById(id);
    if (!usersChat) {
      return res.status(404).json({ message: 'UsersChat not found' });
    }
    res.status(200).json(usersChat);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

export { createUsersChat, getAllUsersChats, getUsersChatById };
