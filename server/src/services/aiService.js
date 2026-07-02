import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const analyzeIngredients = async (buffer) => {
  const prompt = `Identify the ingredients in this fridge or pantry photo and return a JSON array of ingredient names.`;
  const response = await anthropic.response.create({
    model: 'claude-3.5-mini',
    prompt,
    max_tokens_to_sample: 300,
  });
  return response.output_text;
};

export const generateRecipeFromIngredients = async ({ ingredients, prompt }) => {
  const recipePrompt = `Create a recipe using these ingredients: ${ingredients.join(', ')}. ${prompt || ''}`;
  const response = await anthropic.response.create({
    model: 'claude-3.5-mini',
    prompt: recipePrompt,
    max_tokens_to_sample: 600,
  });
  return response.output_text;
};

export const generateMealPlanFromIngredients = async ({ preferences, days }) => {
  const mealPrompt = `Generate a ${days}-day meal plan for a user with preferences: ${preferences}. Include breakfast, lunch, dinner, and snack ideas.`;
  const response = await anthropic.response.create({
    model: 'claude-3.5-mini',
    prompt: mealPrompt,
    max_tokens_to_sample: 500,
  });
  return response.output_text;
};
