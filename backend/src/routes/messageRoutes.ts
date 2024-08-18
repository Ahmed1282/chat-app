// src/routes/messageRoutes.ts
import { Router } from 'express';
import { postMessage, getMessagesByChatId } from '../controllers/messageController';

const router = Router();

router.post('/create', postMessage);
router.get('/get/:id', getMessagesByChatId); // New route to get messages by chat ID

export default router;
