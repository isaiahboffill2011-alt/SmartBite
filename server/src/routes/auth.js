import express from 'express';
import { register, login, refreshSession } from '../controllers/authController.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import { registerSchema, loginSchema, refreshSchema } from '../utils/validation.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/refresh', validateBody(refreshSchema), refreshSession);

export default router;
