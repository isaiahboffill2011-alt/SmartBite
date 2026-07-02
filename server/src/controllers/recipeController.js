import { generateRecipeFromIngredients } from '../services/aiService.js';
import { supabaseClient } from '../utils/supabaseClient.js';

export const generateRecipe = async (req, res, next) => {
  try {
    const { ingredients, prompt } = req.body;
    const recipe = await generateRecipeFromIngredients({ ingredients, prompt });
    return res.status(200).json({ success: true, data: { recipe } });
  } catch (err) {
    next(err);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const { data, error } = await supabaseClient.from('favorites').select('*').eq('user_id', req.user.id);
    if (error) return next({ status: 400, message: error.message });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const saveFavorite = async (req, res, next) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const { data, error } = await supabaseClient.from('favorites').insert([{ user_id: req.user.id, title, ingredients, instructions }]);
    if (error) return next({ status: 400, message: error.message });
    return res.status(201).json({ success: true, data: data[0] });
  } catch (err) {
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const { data, error } = await supabaseClient.from('meal_history').select('*').eq('user_id', req.user.id).order('created_at', { ascending: false });
    if (error) return next({ status: 400, message: error.message });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
