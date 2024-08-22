import { Router } from 'express';
import { postMessage, getMessagesBySenderAndReceiver } from '../controllers/index';

const router = Router();

// router.post('/create', postMessage);
// router.get('/get', getMessagesBySenderAndReceiver);

//router.post('/post', postMessage);
router.get('/getMessages', getMessagesBySenderAndReceiver); 

export default router;
