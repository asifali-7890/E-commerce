// routes/userRoutes.js

import express from 'express';
import { profile, editProfile, login, register } from '../controllers/userController.js';

const router = express.Router();

// Route to handle user registration
router.post('/register', register);
router.post('/login', login);
router.put('/edit', editProfile);
router.get('/profile', profile);

export default router;
