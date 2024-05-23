import express from 'express';

//controllers import
import { createSessionRequest, getAllRequests, respondToRequest, getRequestStatus } from '../Controllers/sessionController.js';

//middleware import
import { authenticateUser } from '../Middlewares/authMiddleware.js';
import {authorizeTeacher} from '../Middlewares/authorizeTeacher.js'

const router = express.Router();

// Session routes (authenticate user then check whether the user is teacher or not)
router.post('/sessions', authenticateUser, createSessionRequest);   
router.get('/sessions', authenticateUser, authorizeTeacher, getAllRequests);
router.patch('/sessions/:id', authenticateUser, authorizeTeacher, respondToRequest);
router.get('/sessions/:id/status', authenticateUser, getRequestStatus);


export default router;