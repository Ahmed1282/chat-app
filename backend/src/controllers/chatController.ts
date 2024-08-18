import { Request, Response } from 'express';
import ChatService from '../services/chatService';

// Controller for creating a new chat
const createChat = async (req: Request, res: Response) => {
  const { receiver_id } = req.body;

  try {
    if (!receiver_id) {
      return res.status(400).json({ message: 'receiver_id is required.' });
    }

    const newChat = await ChatService.createChat(receiver_id);
    res.status(201).json(newChat);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

// Controller for getting all chats
const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await ChatService.getAllChats();
    res.status(200).json(chats);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

// Controller for getting a chat by ID
const getChatById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const chat = await ChatService.getChatById(parseInt(id, 10));
    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({ message: 'Chat not found.' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

export { createChat, getAllChats, getChatById };
