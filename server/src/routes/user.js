import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import { profileUpdateSchema } from '../utils/validation.js';

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.patch('/profile', authenticate, validateBody(profileUpdateSchema), updateProfile);

export default router;
