# MealMind AI Architecture

## Overview
MealMind AI is a full-stack meal planning application with image-based ingredient recognition, recipe generation, grocery list creation, and personalized meal history.

## Layers
- **Frontend**: React + Vite, Tailwind CSS, local UI components inspired by shadcn/ui, React Router navigation, Axios for HTTP requests.
- **Backend**: Node.js + Express, modular route/controller/service organization, Supabase integration for auth, storage, and database access.
- **AI**: Anthropic Claude for visual ingredient analysis, recipe generation, shopping lists, meal planning suggestions, and conversational nutrition support.

## Data Flow
1. User interacts with the React UI.
2. The frontend calls backend REST endpoints.
3. The backend validates requests, authenticates sessions, and routes calls to services.
4. Supabase handles auth, user data, RLS-protected PostgreSQL storage, and image storage.
5. The Anthropic API powers AI workflows for recipes, nutrition, and ingredient extraction.

## Key Modules
- `server/routes`: route definitions
- `server/controllers`: request handling and response generation
- `server/services`: business logic, AI calls, Supabase operations
- `server/middleware`: authentication and error handling
- `client/src`: reusable UI components, auth hooks, pages, and routes
- `shared`: shared TypeScript types and API models
