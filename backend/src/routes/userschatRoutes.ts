import { Router } from 'express';
import { createUsersChat, getAllUsersChats, getUsersChatById } from '../controllers/userschatController';

const router = Router();

router.post('/create', createUsersChat);

router.get('/get', getAllUsersChats);

router.get('/get/:id', getUsersChatById);

export default router;
