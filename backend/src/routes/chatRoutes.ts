import { Router } from 'express';
import { createChat } from '../controllers/chatController';

const router = Router();

// Route for creating a new chat
router.post('/create', createChat);

export default router;
