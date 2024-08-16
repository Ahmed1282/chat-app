import { Router } from 'express';
import { postMessage } from '../controllers/messageController';

const router = Router();

router.post('/create', postMessage);

export default router;
