import express from 'express';

//controllers import
import { registerUser, loginUser, getProfile, updateProfile } from '../Controllers/userController.js';

const router = express.Router();

// Register & Login --> Available for all
router.post('/register', registerUser);  
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.put('profile', updateProfile);


export default router;
