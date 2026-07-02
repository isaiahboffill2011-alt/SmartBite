import express from 'express';
import { generateMealPlan, getMealPlan } from '../controllers/mealPlanController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import { mealPlanSchema } from '../utils/validation.js';

const router = express.Router();

router.get('/', authenticate, getMealPlan);
router.post('/', authenticate, validateBody(mealPlanSchema), generateMealPlan);

export default router;
