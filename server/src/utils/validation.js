import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const recipeGenerateSchema = z.object({
  ingredients: z.array(z.string()).min(1),
  prompt: z.string().optional(),
});

export const favoriteSchema = z.object({
  title: z.string().min(1),
  ingredients: z.array(z.string()).min(1),
  instructions: z.string().min(1),
});

export const mealPlanSchema = z.object({
  preferences: z.string().optional(),
  days: z.number().min(1).max(14),
});

export const profileUpdateSchema = z.object({
  name: z.string().optional(),
  preferences: z.string().optional(),
});
