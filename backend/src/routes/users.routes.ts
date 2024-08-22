
import express from 'express';
import {Signup, Login, getAllUsers} from '../controllers/index'; 
import {AuthToken} from '../middlewares/auth'

const router = express.Router();


// router.post('/signup', Signup);

// router.post('/login', Login);

// router.get('/names', AuthToken, getAllUsers);

router.post('/signup', Signup);

router.post('/login', Login);

router.get('/getAllUsers', AuthToken, getAllUsers);

export default router;
