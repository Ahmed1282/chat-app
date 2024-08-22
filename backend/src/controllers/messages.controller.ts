import { Request, Response } from 'express';
import MessageService from '../services/messages';

const postMessage = async (req: Request, res: Response) => {
  const { sender_id, receiver_id, message_str } = req.body;

  try {
    if (!sender_id || !receiver_id || !message_str) {
      return res.status(400).json({ message: 'sender_id, receiver_id, and message_str must be provided.' });
    }

    const newMessage = await MessageService.postMessage(sender_id, receiver_id, message_str);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
  }
};

const getMessagesBySenderAndReceiver = async (req: Request, res: Response) => {
  const { sender_id, receiver_id } = req.query;

  try {
    if (!sender_id || !receiver_id) {
      return res.status(400).json({ message: 'sender_id and receiver_id must be provided.' });
    }

    const messages = await MessageService.getMessagesBySenderAndReceiver(
      Number(sender_id),
      Number(receiver_id)
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
  }
};

export { postMessage, getMessagesBySenderAndReceiver };
