import { generateMealPlanFromIngredients } from '../services/aiService.js';

export const getMealPlan = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, data: { plan: [] } });
  } catch (err) {
    next(err);
  }
};

export const generateMealPlan = async (req, res, next) => {
  try {
    const { preferences, days } = req.body;
    const plan = await generateMealPlanFromIngredients({ preferences, days });
    return res.status(200).json({ success: true, data: { plan } });
  } catch (err) {
    next(err);
  }
};
