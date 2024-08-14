// src/routes/userRoutes.ts
import express from 'express';
import Signup from '../controllers/userController'; // Correct import path

const router = express.Router();


// Route for user signup
router.post('/signup', Signup);

export default router;
