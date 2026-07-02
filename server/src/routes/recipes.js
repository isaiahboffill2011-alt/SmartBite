import express from 'express';
import { generateRecipe, getFavorites, saveFavorite, getHistory } from '../controllers/recipeController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import { recipeGenerateSchema, favoriteSchema } from '../utils/validation.js';

const router = express.Router();

router.get('/favorites', authenticate, getFavorites);
router.get('/history', authenticate, getHistory);
router.post('/generate', authenticate, validateBody(recipeGenerateSchema), generateRecipe);
router.post('/save', authenticate, validateBody(favoriteSchema), saveFavorite);

export default router;
