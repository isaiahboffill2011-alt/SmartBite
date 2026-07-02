import { supabaseClient } from '../utils/supabaseClient.js';
import { analyzeIngredients } from '../services/aiService.js';

export const uploadImage = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return next({ status: 400, message: 'Image file is required' });

    const fileName = `${req.user.id}/${Date.now()}-${file.originalname}`;
    const { data, error } = await supabaseClient.storage
      .from('images')
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) return next({ status: 400, message: error.message });
    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;
    return res.status(201).json({ success: true, data: { url: publicUrl } });
  } catch (err) {
    next(err);
  }
};

export const analyzeImage = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return next({ status: 400, message: 'Image file is required' });
    // upload image to storage to keep a record and provide a public url
    const fileName = `${req.user.id}/${Date.now()}-${file.originalname}`;
    const { error: uploadError } = await supabaseClient.storage
      .from('images')
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (uploadError) return next({ status: 400, message: uploadError.message });

    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;

    // call AI service to detect ingredients
    const ingredientsRaw = await analyzeIngredients(file.buffer);
    let ingredients = [];
    try {
      if (typeof ingredientsRaw === 'string') {
        ingredients = JSON.parse(ingredientsRaw);
      } else {
        ingredients = ingredientsRaw;
      }
    } catch (e) {
      // fallback: split lines or commas
      if (typeof ingredientsRaw === 'string') {
        ingredients = ingredientsRaw
          .split(/\n|,/) 
          .map((s) => s.replace(/[-\d\.]+/g, '').trim())
          .filter(Boolean);
      }
    }

    // generate a recipe using the detected ingredients
    const { generateRecipeFromIngredients } = await import('../services/aiService.js');
    const recipeText = await generateRecipeFromIngredients({ ingredients });

    return res.status(200).json({ success: true, data: { ingredients, recipe: recipeText, imageUrl: publicUrl } });
  } catch (err) {
    next(err);
  }
};
