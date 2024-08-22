import { Router } from 'express';
import userRoutes from './users.routes';
import messageRoutes from './message.routes';

const router = Router();

router.use('/users', userRoutes); 
router.use('/messages', messageRoutes); 

export default router;
