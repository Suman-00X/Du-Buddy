import express from 'express';

//controllers import
import { registerUser, loginUser } from '../Controllers/userController.js';

const router = express.Router();

// Register & Login --> Available for all
router.post('/register', registerUser);  
router.post('/login', loginUser);


export default router;
