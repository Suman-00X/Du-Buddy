import express from 'express';

//controllers import
import { registerUser, loginUser, getProfile, updateProfile, getUserById } from '../Controllers/userController.js';

import { authenticateUser } from '../Middlewares/authMiddleware.js';


const router = express.Router();

// Register & Login --> Available for all
router.post('/register', registerUser);  
router.post('/login', loginUser);
// User profile routes
router.get('/profile', authenticateUser, getProfile);
router.patch('/profile', authenticateUser, updateProfile);
router.get('/:id', getUserById);


export default router;
