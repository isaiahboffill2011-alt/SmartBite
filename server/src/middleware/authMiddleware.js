import { supabaseClient } from '../utils/supabaseClient.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return next({ status: 401, message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const { data, error } = await supabaseClient.auth.getUser(token);
    if (error || !data.user) return next({ status: 401, message: 'Invalid token' });

    req.user = data.user;
    next();
  } catch (err) {
    next(err);
  }
};
