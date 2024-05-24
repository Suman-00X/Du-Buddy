import express from 'express';

// Controllers import
import { createSessionRequest, getAllRequests, respondToRequest, getStudentRequests, getAllTeachers } from '../Controllers/sessionController.js';

// Middleware import
import { authenticateUser } from '../Middlewares/authMiddleware.js';
import { authorizeTeacher } from '../Middlewares/authorizeTeacher.js';

const router = express.Router();

// Session routes
router.post('/sessions', authenticateUser, createSessionRequest);
router.get('/sessions', authenticateUser, authorizeTeacher, getAllRequests);
router.patch('/sessions/:id', authenticateUser, authorizeTeacher, respondToRequest);
router.get('/student/sessions', authenticateUser, getStudentRequests);
router.get('/sessions/teachers', authenticateUser, getAllTeachers); // New route to get all teachers

export default router;
