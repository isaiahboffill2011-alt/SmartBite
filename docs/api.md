# SmartBite API Reference

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

## Images
- `POST /api/images/upload`
- `POST /api/images/analyze`

## Recipes
- `GET /api/recipes/favorites`
- `POST /api/recipes/generate`
- `GET /api/recipes/history`
- `POST /api/recipes/save`

## Meal Planning
- `POST /api/meal-plan`
- `GET /api/meal-plan`

## Shopping
- `POST /api/shopping-list`

## User
- `GET /api/user/profile`
- `PATCH /api/user/profile`

## Notes
- All protected endpoints require `Authorization: Bearer <token>`.
- Input is validated with Zod schemas.
- Responses use consistent JSON envelope objects with `success`, `data`, and `error` fields.
