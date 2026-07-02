import { supabaseClient } from '../utils/supabaseClient.js';
import { generateFridgeAnalysis } from '../services/aiService.js';

export const analyzeFridge = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ success: false, error: 'imageUrl is required' });

    // Call AI service to analyze the image URL
    const result = await generateFridgeAnalysis(imageUrl);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('analyzeFridge error', err);
    next(err);
  }
};
