import express from 'express';
import VerifiedUser from '../middleware/VerifiedUser.Middleware.js';
import { updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

// Protected route - only accessible to verified users
router.put('/updateProfile/:id', VerifiedUser, updateProfile);

export default router;
