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

export const generateFridgeAnalysis = async (imageUrl) => {
  const prompt = `You are SmartBite AI.\n\nAnalyze this fridge image: ${imageUrl}\n\nIdentify every visible ingredient with high confidence. Using those ingredients, create one practical recipe that uses as many detected ingredients as possible. If anything essential is missing, list only those missing ingredients. Return ONLY valid JSON using this exact schema:\n\n{\n  "ingredients": [],\n  "recipe": {\n    "title": "",\n    "cookTime": "",\n    "difficulty": "",\n    "servings": "",\n    "ingredients": [],\n    "instructions": [],\n    "missingIngredients": [],\n    "nutrition": "",\n    "reason": ""\n  }\n}\n\nDo not include markdown or extra text.`;

  const response = await anthropic.response.create({
    model: 'claude-3.5-mini',
    prompt,
    max_tokens_to_sample: 1200,
  });

  let output = response.output_text;

  // attempt to find JSON in the output
  let jsonText = output.trim();
  try {
    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (e) {
    // try to extract first { ... } block
    const match = jsonText.match(/\{[\s\S]*\}/m);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e2) {
        throw new Error('Could not parse JSON from AI response');
      }
    }
    throw new Error('Invalid AI response');
  }
};
