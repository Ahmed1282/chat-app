import { Router } from 'express';
import { createChat, getAllChats, getChatById } from '../controllers/chatController';

const router = Router();

// Route for creating a new chat
router.post('/create', createChat);

// Route for getting all chats
router.get('/', getAllChats);

// Route for getting a chat by ID
router.get('/get/:id', getChatById);

export default router;
