export const validateBody = (schema) => (req, res, next) => {
  const parseResult = schema.safeParse(req.body);
  if (!parseResult.success) {
    return next({ status: 400, message: parseResult.error.errors.map((e) => e.message).join(', ') });
  }
  req.body = parseResult.data;
  next();
};
