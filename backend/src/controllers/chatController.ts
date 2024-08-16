import { Request, Response } from 'express';
import ChatService from '../services/chatService';

// Controller for creating a new chat
const createChat = async (req: Request, res: Response) => {
  const { sender_id } = req.body;

  try {
    if (!sender_id) {
      return res.status(400).json({ message: 'sender_id is required.' });
    }

    const newChat = await ChatService.createChat(sender_id);
    res.status(201).json(newChat);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

export { createChat };
