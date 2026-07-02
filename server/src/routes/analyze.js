import express from 'express';
import { analyzeFridge } from '../controllers/analyzeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Frontend uploads image to Supabase, then sends imageUrl to this endpoint
// Allow unauthenticated analysis as well (frontend will often call after upload)
router.post('/fridge', analyzeFridge);

export default router;
