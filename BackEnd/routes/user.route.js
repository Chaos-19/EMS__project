import express from 'express';
import VerifiedUser from '../middleware/VerifiedUser.Middleware.js';
import { deleteUser, updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

// Protected route - only accessible to verified users
router.put('/updateProfile/:id', VerifiedUser, updateProfile);
router.delete('/deleteUser/:id', VerifiedUser, deleteUser);

export default router;
