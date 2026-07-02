import express from 'express';
import authRoutes from './auth.js';
import imageRoutes from './images.js';
import recipeRoutes from './recipes.js';
import mealPlanRoutes from './mealPlan.js';
import userRoutes from './user.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/images', imageRoutes);
router.use('/recipes', recipeRoutes);
router.use('/meal-plan', mealPlanRoutes);
router.use('/user', userRoutes);

export default router;
