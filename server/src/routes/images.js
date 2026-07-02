import express from 'express';
import multer from 'multer';
import { uploadImage, analyzeImage } from '../controllers/imageController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authenticate, upload.single('image'), uploadImage);
router.post('/analyze', authenticate, upload.single('image'), analyzeImage);

export default router;
