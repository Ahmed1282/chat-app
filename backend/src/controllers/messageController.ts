import { Request, Response } from 'express';
import MessageService from '../services/messageService';

const postMessage = async (req: Request, res: Response) => {
  const { sender_id, chat_id,message_str } = req.body;

  try {
    if (!sender_id || !message_str || !chat_id) {
      return res.status(400).json({ message: 'sender_id and message_str must be provided.' });
    }

    const newMessage = await MessageService.postMessage(sender_id, chat_id, message_str);
    res.status(201).json(newMessage);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

export { postMessage };
